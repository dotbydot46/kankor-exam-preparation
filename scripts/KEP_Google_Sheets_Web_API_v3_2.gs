/**
 * KEP v3.2 — Google Sheets Web API for Review + Published Practice
 * ------------------------------------------------------
 * What this version does:
 * - Reads safe summaries from the KEP Google Sheet for the Review Dashboard.
 * - Adds review columns automatically if they are missing.
 * - Saves review status, reviewer notes, reviewer name, and reviewed date back to Google Sheets.
 * - Returns only Published questions to the Practice MCQs page.
 *
 * Setup:
 * 1) Paste this file into your existing KEP Apps Script project.
 * 2) Keep the same spreadsheet ID below.
 * 3) Deploy as Web App: Execute as Me, access Anyone with the link.
 * 4) Paste the Web App URL into KEP review-dashboard.html.
 *
 * Privacy: this API returns summary fields only and avoids contact details.
 * Security note: keep the Web App URL private/admin-only. Optionally set reviewKey.
 */

const KEP_LIVE_CONFIG = {
  spreadsheetId: '1Kdd14yTn8mZtcR1JNPsWWpFV3-9lFBWIePDHezBbl0g',
  maxRowsPerSheet: 200,
  // Optional: set a private word here, for example 'k3p-admin-2026'.
  // If you set it, the dashboard must send the same Review Access Key to save changes.
  reviewKey: ''
};

const KEP_REVIEW_STATUSES = [
  'Collected',
  'Source Check',
  'Academic Review',
  'Translation Review',
  'Ready to Publish',
  'Published',
  'Rejected'
];

const KEP_REVIEW_COLUMNS = [
  'Review Status',
  'Reviewer Notes',
  'Reviewed By',
  'Reviewed At'
];

function doGet(e) {
  try {
    const params = (e && e.parameter) ? e.parameter : {};
    const action = (params.action || 'review').toLowerCase();
    let payload;

    if (action === 'review') {
      payload = { ok: true, generatedAt: new Date().toISOString(), items: getReviewItems_() };
    } else if (action === 'update') {
      payload = updateReviewItem_(params);
    } else if (action === 'publishedquestions' || action === 'practice') {
      payload = { ok: true, generatedAt: new Date().toISOString(), questions: getPublishedQuestions_() };
    } else {
      payload = { ok: false, error: 'Unknown action.' };
    }

    return respond_(payload, params.callback);
  } catch (err) {
    const params = (e && e.parameter) ? e.parameter : {};
    return respond_({ ok: false, error: err.message || String(err) }, params.callback);
  }
}

function respond_(payload, callback) {
  const text = callback
    ? `${callback}(${JSON.stringify(payload)});`
    : JSON.stringify(payload);
  return ContentService
    .createTextOutput(text)
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}

function getReviewItems_() {
  const ss = SpreadsheetApp.openById(KEP_LIVE_CONFIG.spreadsheetId);
  const output = [];

  ss.getSheets().forEach(sheet => {
    let values = sheet.getDataRange().getDisplayValues();
    if (values.length < 1) return;

    let headers = values[0].map(h => String(h).trim());
    const type = classifySheet_(headers, sheet.getName());
    if (!type) return;

    const reviewCols = ensureReviewColumns_(sheet);

    // Read again after potentially adding columns.
    values = sheet.getDataRange().getDisplayValues();
    headers = values[0].map(h => String(h).trim());

    values.slice(1, KEP_LIVE_CONFIG.maxRowsPerSheet + 1).forEach((row, idx) => {
      if (row.every(cell => !String(cell).trim())) return;
      const item = mapRowToReviewItem_(type, headers, row, sheet.getName(), idx + 2, reviewCols);
      if (item) output.push(item);
    });
  });

  return output;
}

function classifySheet_(headers, sheetName) {
  const joined = headers.join(' | ').toLowerCase();
  if (joined.includes('question text') && joined.includes('correct answer')) return 'Question';
  if (joined.includes('paper title') && joined.includes('paper type')) return 'Past Paper';
  if (joined.includes('resource title') && joined.includes('resource type')) return 'Book / Notes';
  if (joined.includes('what is wrong') || joined.includes('suggested correction')) return 'Correction';
  if (joined.includes('how can you help') && joined.includes('availability')) return 'Volunteer';
  if (sheetName.toLowerCase().includes('approved questions')) return 'Approved Question';
  return null;
}

function ensureReviewColumns_(sheet) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastCol).getDisplayValues()[0].map(h => String(h).trim());
  const indexes = {};
  KEP_REVIEW_COLUMNS.forEach(col => {
    let idx = headers.findIndex(h => h.toLowerCase() === col.toLowerCase());
    if (idx === -1) {
      idx = sheet.getLastColumn();
      sheet.getRange(1, idx + 1).setValue(col);
      indexes[col] = idx + 1;
    } else {
      indexes[col] = idx + 1;
    }
  });
  try {
    sheet.getRange(1, 1, 1, sheet.getLastColumn())
      .setFontWeight('bold')
      .setBackground('#0f305b')
      .setFontColor('#ffffff')
      .setWrap(true);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, Math.min(sheet.getLastColumn(), 12));
  } catch (err) {}
  return indexes;
}

function mapRowToReviewItem_(type, headers, row, sheetName, rowNumber) {
  const get = label => {
    const index = headers.findIndex(h => h.toLowerCase() === label.toLowerCase());
    return index >= 0 ? String(row[index] || '').trim() : '';
  };
  const getAny = labels => {
    for (const label of labels) {
      const value = get(label);
      if (value) return value;
    }
    return '';
  };

  const lang = getAny(['Language','Languages']) || 'Not specified';
  const sourceType = getAny(['Source type','Paper type','Resource type','Content type']) || 'Google Form';
  const sourceDetails = getAny([
    'Source details / book page / paper year / link',
    'Source details / permission note',
    'File link (Google Drive / Dropbox / other)',
    'Page / question / item reference'
  ]) || 'Needs source details';
  const subject = getAny(['Subject','Subjects you can help with']) || '';
  const prefixMap = { 'Question':'Q', 'Past Paper':'P', 'Book / Notes':'B', 'Correction':'C', 'Volunteer':'V', 'Approved Question':'AQ' };
  const id = `${prefixMap[type] || 'L'}-${rowNumber}`;

  let title = '';
  let checks = [];

  if (type === 'Question' || type === 'Approved Question') {
    const q = getAny(['Question text','Question Text']);
    const chapter = getAny(['Chapter / topic','Chapter']);
    title = `${subject || 'Question'}${chapter ? ' / ' + chapter : ''}: ${shorten_(q, 80) || 'New MCQ submission'}`;
    checks = ['Verify correct answer', 'Check explanation', 'Confirm source label', 'Language review'];
  } else if (type === 'Past Paper') {
    title = `${get('Paper title') || 'Past paper'}${get('Year') ? ' — ' + get('Year') : ''}`;
    checks = ['Check official/centre label', 'Verify permission/source', 'Check PDF link', 'Language and year review'];
  } else if (type === 'Book / Notes') {
    title = `${get('Resource title') || 'Book / notes resource'}${subject ? ' — ' + subject : ''}`;
    checks = ['Check copyright/permission', 'Verify file readability', 'Check subject/grade label', 'Language review'];
  } else if (type === 'Correction') {
    title = `${get('Content type') || 'Correction'}: ${shorten_(get('What is wrong?'), 85)}`;
    checks = ['Find original item', 'Check suggested fix', 'Update content if correct', 'Mark resolved'];
  } else if (type === 'Volunteer') {
    const roles = get('How can you help?') || 'Volunteer application';
    title = `Volunteer application: ${shorten_(roles, 80)}`;
    checks = ['Contact privately from Sheet only', 'Assign role', 'Confirm subject/language strength', 'Onboarding note'];
  }

  const status = get('Review Status') || 'Collected';
  const reviewerNotes = get('Reviewer Notes');
  const reviewedBy = get('Reviewed By');
  const reviewedAt = get('Reviewed At');

  return {
    id,
    type,
    title,
    source: `${sourceType}${sourceDetails ? ' — ' + shorten_(sourceDetails, 100) : ''}`,
    language: lang,
    status: KEP_REVIEW_STATUSES.includes(status) ? status : 'Collected',
    reviewerNotes,
    reviewedBy,
    reviewedAt,
    sheetName,
    rowNumber,
    canSave: true,
    origin: `Live Google Sheet: ${sheetName}, row ${rowNumber}`,
    checks
  };
}

function updateReviewItem_(params) {
  if (KEP_LIVE_CONFIG.reviewKey && params.reviewKey !== KEP_LIVE_CONFIG.reviewKey) {
    return { ok: false, error: 'Invalid review access key.' };
  }

  const sheetName = String(params.sheetName || '').trim();
  const rowNumber = Number(params.rowNumber || 0);
  const status = String(params.status || '').trim();
  const reviewerNotes = String(params.reviewerNotes || '').trim();
  const reviewedBy = String(params.reviewedBy || '').trim();

  if (!sheetName) return { ok: false, error: 'Missing sheet name.' };
  if (!rowNumber || rowNumber < 2) return { ok: false, error: 'Invalid row number.' };
  if (!KEP_REVIEW_STATUSES.includes(status)) return { ok: false, error: 'Invalid review status.' };

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const ss = SpreadsheetApp.openById(KEP_LIVE_CONFIG.spreadsheetId);
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return { ok: false, error: 'Sheet not found: ' + sheetName };

    const cols = ensureReviewColumns_(sheet);
    const now = new Date();

    sheet.getRange(rowNumber, cols['Review Status']).setValue(status);
    sheet.getRange(rowNumber, cols['Reviewer Notes']).setValue(reviewerNotes);
    sheet.getRange(rowNumber, cols['Reviewed By']).setValue(reviewedBy || 'KEP reviewer');
    sheet.getRange(rowNumber, cols['Reviewed At']).setValue(now);

    return {
      ok: true,
      message: 'Review status saved.',
      item: {
        sheetName,
        rowNumber,
        status,
        reviewerNotes,
        reviewedBy: reviewedBy || 'KEP reviewer',
        reviewedAt: now.toISOString()
      }
    };
  } finally {
    lock.releaseLock();
  }
}

function shorten_(text, max) {
  text = String(text || '').replace(/\s+/g, ' ').trim();
  return text.length > max ? text.slice(0, max - 1) + '…' : text;
}


function getPublishedQuestions_() {
  const ss = SpreadsheetApp.openById(KEP_LIVE_CONFIG.spreadsheetId);
  const output = [];
  ss.getSheets().forEach(sheet => {
    let values = sheet.getDataRange().getDisplayValues();
    if (values.length < 2) return;
    let headers = values[0].map(h => String(h).trim());
    const type = classifySheet_(headers, sheet.getName());
    if (type !== 'Question' && type !== 'Approved Question') return;
    ensureReviewColumns_(sheet);
    values = sheet.getDataRange().getDisplayValues();
    headers = values[0].map(h => String(h).trim());
    values.slice(1, KEP_LIVE_CONFIG.maxRowsPerSheet + 1).forEach((row, idx) => {
      if (row.every(cell => !String(cell).trim())) return;
      const status = getCell_(headers, row, 'Review Status');
      if (String(status).trim().toLowerCase() !== 'published') return;
      const mapped = mapRowToPracticeQuestion_(headers, row, sheet.getName(), idx + 2);
      if (mapped) output.push(mapped);
    });
  });
  return output;
}

function mapRowToPracticeQuestion_(headers, row, sheetName, rowNumber) {
  const getAny = labels => {
    for (const label of labels) {
      const value = getCell_(headers, row, label);
      if (value) return value;
    }
    return '';
  };
  const subject = getAny(['Subject','subject']) || 'General Knowledge';
  const chapter = getAny(['Chapter / topic','Chapter','Topic']);
  const language = getAny(['Language','Question language']) || 'English';
  const questionText = getAny(['Question text','Question Text','Question']);
  const optionA = getAny(['Option A','A']);
  const optionB = getAny(['Option B','B']);
  const optionC = getAny(['Option C','C']);
  const optionD = getAny(['Option D','D']);
  const options = [optionA, optionB, optionC, optionD].filter(v => String(v).trim());
  const correctRaw = getAny(['Correct answer','Correct Answer','Answer']);
  const explanation = getAny(['Explanation','Answer explanation']) || 'Explanation will be added after review.';
  const source = getAny(['Source details / book page / paper year / link','Source','Source details']) || 'Published from KEP review system';
  if (!questionText || options.length < 2) return null;
  const correct = correctIndex_(correctRaw, [optionA, optionB, optionC, optionD]);
  return {
    id: `PUB-${rowNumber}`,
    subject,
    subjectSlug: normalizeSubjectForPractice_(subject),
    chapter,
    language,
    q: questionText,
    options,
    correct,
    explanation,
    source: shorten_(source, 120),
    sheetName,
    rowNumber
  };
}

function getCell_(headers, row, label) {
  const index = headers.findIndex(h => String(h).trim().toLowerCase() === String(label).trim().toLowerCase());
  return index >= 0 ? String(row[index] || '').trim() : '';
}

function correctIndex_(correctRaw, options) {
  const raw = String(correctRaw || '').trim();
  const lower = raw.toLowerCase();
  if (/^[a-d]$/.test(lower)) return lower.charCodeAt(0) - 97;
  if (/^[1-4]$/.test(lower)) return Number(lower) - 1;
  const exact = options.findIndex(o => String(o || '').trim().toLowerCase() === lower);
  if (exact >= 0) return exact;
  const startsWith = options.findIndex(o => lower && String(o || '').trim().toLowerCase().startsWith(lower));
  return startsWith >= 0 ? startsWith : 0;
}

function normalizeSubjectForPractice_(subject) {
  const raw = String(subject || '').toLowerCase();
  if (raw.includes('math') || raw.includes('ریاضی') || raw.includes('حساب')) return 'math';
  if (raw.includes('bio') || raw.includes('biology') || raw.includes('ژوند') || raw.includes('حیات')) return 'biology';
  if (raw.includes('english') || raw.includes('انگلیسي') || raw.includes('انگلیسی')) return 'english';
  if (raw.includes('general') || raw.includes('عمومي') || raw.includes('عمومی')) return 'general';
  if (raw.includes('chem') || raw.includes('کیمیا')) return 'chemistry';
  if (raw.includes('phys') || raw.includes('فزیک')) return 'physics';
  return raw.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'general';
}

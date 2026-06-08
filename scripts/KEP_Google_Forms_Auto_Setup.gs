/**
 * KEP v2.7 — Google Forms + Google Sheets Setup
 * ------------------------------------------------
 * Paste this file into Google Apps Script and run setupKEPFormsAndSheets().
 * It creates one master spreadsheet, five Google Forms, response tabs, and setup links.
 *
 * Privacy choice: forms do NOT collect email automatically. Contributors can provide contact details voluntarily.
 */

const KEP_CONFIG = {
  projectName: 'KEP — Kankor Exam Preparation',
  spreadsheetName: 'KEP Content Collection System',
  languageOptions: ['English', 'Pashto', 'Dari', 'Mixed'],
  subjectOptions: [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Pashto', 'Dari',
    'Islamic Studies', 'History', 'Geography', 'General Knowledge', 'Other'
  ],
  sourceTypeOptions: [
    'Official source', 'School textbook', 'Teacher-created', 'Kankor centre paper',
    'Past paper', 'Collected online', 'Student submitted', 'Other / unsure'
  ],
  statusOptions: ['New', 'Needs source check', 'Needs academic review', 'Needs translation', 'Approved', 'Rejected', 'Published'],
  difficultyOptions: ['Easy', 'Medium', 'Hard', 'Exam level', 'Unsure'],
};

function setupKEPFormsAndSheets() {
  const spreadsheet = SpreadsheetApp.create(KEP_CONFIG.spreadsheetName);
  const ssId = spreadsheet.getId();

  setupMasterSheets_(spreadsheet);

  const links = [];
  links.push(createQuestionForm_(ssId));
  links.push(createPastPaperForm_(ssId));
  links.push(createBookNotesForm_(ssId));
  links.push(createCorrectionForm_(ssId));
  links.push(createVolunteerForm_(ssId));

  writeSetupLinks_(spreadsheet, links);
  writeReadme_(spreadsheet);

  SpreadsheetApp.flush();
  Logger.log('KEP setup complete. Open spreadsheet: ' + spreadsheet.getUrl());
}

function setupMasterSheets_(spreadsheet) {
  const defaultSheet = spreadsheet.getSheets()[0];
  defaultSheet.setName('Dashboard');
  writeSheet_(spreadsheet, 'Dashboard', [
    ['KEP Content Collection System'],
    ['Purpose', 'Collect, verify, translate, and publish trusted Kankor learning content.'],
    ['Workflow', 'Collect → Check Source → Review → Translate → Publish'],
    ['Important', 'Do not publish any question, paper, book, or update until source and review status are clear.'],
  ]);

  writeSheet_(spreadsheet, 'Approved Questions', [[
    'Question ID','Status','Subject','Chapter','Language','Question Text','Option A','Option B','Option C','Option D',
    'Correct Answer','Explanation','Difficulty','Source Type','Source Details','Contributor','Reviewer','Review Notes','Date Approved','Publish?'
  ]]);

  writeSheet_(spreadsheet, 'Approved Past Papers', [[
    'Paper ID','Status','Title','Year','Subject','Language','Paper Type','Source Type','Source Details','File Link',
    'Contributor','Reviewer','Review Notes','Date Approved','Publish?'
  ]]);

  writeSheet_(spreadsheet, 'Approved Books Notes', [[
    'Resource ID','Status','Title','Subject','Grade/Class','Language','Resource Type','Source Type','Source Details','File Link',
    'Contributor','Reviewer','Review Notes','Date Approved','Publish?'
  ]]);

  writeSheet_(spreadsheet, 'Corrections Queue', [[
    'Correction ID','Status','Content Type','Page/Question Reference','Problem Description','Suggested Fix','Submitted By','Reviewer','Review Notes','Resolved Date'
  ]]);

  writeSheet_(spreadsheet, 'Volunteer Directory', [[
    'Volunteer ID','Status','Name','Role','Subjects','Languages','Contact','Location/Timezone','Availability','Notes','Onboarded Date'
  ]]);

  writeSheet_(spreadsheet, 'Review Queue', [[
    'Item ID','Status','Content Type','Subject','Language','Source Type','Source Details','Reviewer','Priority','Notes','Last Updated'
  ]]);

  writeSheet_(spreadsheet, 'Official Updates', [[
    'Update ID','Status','Title','Category','Official Source URL','Summary','Date Found','Reviewed By','Publish?'
  ]]);

  writeSheet_(spreadsheet, 'Girls Education Sources', [[
    'Source ID','Status','Title','Organization','Source URL','Fact / Note','Date Published','Reviewed By','Publish?'
  ]]);

  writeSheet_(spreadsheet, 'Dropdown Lists', [
    ['Languages', ...KEP_CONFIG.languageOptions],
    ['Subjects', ...KEP_CONFIG.subjectOptions],
    ['Source Types', ...KEP_CONFIG.sourceTypeOptions],
    ['Statuses', ...KEP_CONFIG.statusOptions],
    ['Difficulty', ...KEP_CONFIG.difficultyOptions],
  ]);

  applyBasicFormatting_(spreadsheet);
}

function createQuestionForm_(spreadsheetId) {
  const form = FormApp.create('KEP — Submit MCQ / Question');
  form.setDescription('Submit a Kankor preparation question for KEP. Please provide source details where possible.');
  form.setCollectEmail(false);
  form.addTextItem().setTitle('Contributor name or nickname').setRequired(false);
  form.addTextItem().setTitle('Contact detail (optional WhatsApp/email)').setRequired(false);
  form.addListItem().setTitle('Subject').setChoiceValues(KEP_CONFIG.subjectOptions).setRequired(true);
  form.addTextItem().setTitle('Chapter / topic').setRequired(false);
  form.addListItem().setTitle('Language').setChoiceValues(KEP_CONFIG.languageOptions).setRequired(true);
  form.addParagraphTextItem().setTitle('Question text').setRequired(true);
  form.addTextItem().setTitle('Option A').setRequired(true);
  form.addTextItem().setTitle('Option B').setRequired(true);
  form.addTextItem().setTitle('Option C').setRequired(true);
  form.addTextItem().setTitle('Option D').setRequired(true);
  form.addMultipleChoiceItem().setTitle('Correct answer').setChoiceValues(['A','B','C','D']).setRequired(true);
  form.addParagraphTextItem().setTitle('Explanation / reason').setRequired(false);
  form.addListItem().setTitle('Difficulty').setChoiceValues(KEP_CONFIG.difficultyOptions).setRequired(false);
  form.addListItem().setTitle('Source type').setChoiceValues(KEP_CONFIG.sourceTypeOptions).setRequired(true);
  form.addParagraphTextItem().setTitle('Source details / book page / paper year / link').setRequired(false);
  form.setConfirmationMessage('Thank you. KEP will review the question before publishing.');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheetId);
  return formLinkObject_('Question Submission Form', form);
}

function createPastPaperForm_(spreadsheetId) {
  const form = FormApp.create('KEP — Submit Past Paper');
  form.setDescription('Submit a past paper, centre paper, teacher paper, or collected practice paper. Use clear source labels.');
  form.setCollectEmail(false);
  form.addTextItem().setTitle('Contributor name or nickname').setRequired(false);
  form.addTextItem().setTitle('Contact detail (optional WhatsApp/email)').setRequired(false);
  form.addTextItem().setTitle('Paper title').setRequired(true);
  form.addTextItem().setTitle('Year').setRequired(false);
  form.addListItem().setTitle('Subject').setChoiceValues(KEP_CONFIG.subjectOptions).setRequired(false);
  form.addListItem().setTitle('Language').setChoiceValues(KEP_CONFIG.languageOptions).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Paper type').setChoiceValues(['Official past paper','Kankor centre practice paper','Teacher shared paper','Collected practice paper','Other / unsure']).setRequired(true);
  form.addListItem().setTitle('Source type').setChoiceValues(KEP_CONFIG.sourceTypeOptions).setRequired(true);
  form.addParagraphTextItem().setTitle('Source details / permission note').setRequired(false);
  form.addTextItem().setTitle('File link (Google Drive / Dropbox / other)').setRequired(true);
  form.addParagraphTextItem().setTitle('Notes').setRequired(false);
  form.setConfirmationMessage('Thank you. KEP will check the source before publishing.');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheetId);
  return formLinkObject_('Past Paper Submission Form', form);
}

function createBookNotesForm_(spreadsheetId) {
  const form = FormApp.create('KEP — Submit Book / Notes / PDF');
  form.setDescription('Submit books, notes, formula sheets, revision guides, or self-study resources.');
  form.setCollectEmail(false);
  form.addTextItem().setTitle('Contributor name or nickname').setRequired(false);
  form.addTextItem().setTitle('Contact detail (optional WhatsApp/email)').setRequired(false);
  form.addTextItem().setTitle('Resource title').setRequired(true);
  form.addListItem().setTitle('Subject').setChoiceValues(KEP_CONFIG.subjectOptions).setRequired(false);
  form.addTextItem().setTitle('Grade / class').setRequired(false);
  form.addListItem().setTitle('Language').setChoiceValues(KEP_CONFIG.languageOptions).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Resource type').setChoiceValues(['Textbook','Notes','Formula sheet','Revision guide','Girls self-study pack','Other']).setRequired(true);
  form.addListItem().setTitle('Source type').setChoiceValues(KEP_CONFIG.sourceTypeOptions).setRequired(true);
  form.addParagraphTextItem().setTitle('Source details / permission note').setRequired(false);
  form.addTextItem().setTitle('File link (Google Drive / Dropbox / other)').setRequired(true);
  form.addParagraphTextItem().setTitle('Notes').setRequired(false);
  form.setConfirmationMessage('Thank you. KEP will review the resource before publishing.');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheetId);
  return formLinkObject_('Book / Notes Submission Form', form);
}

function createCorrectionForm_(spreadsheetId) {
  const form = FormApp.create('KEP — Report a Mistake / Correction');
  form.setDescription('Report wrong answers, unclear translation, broken links, or content issues.');
  form.setCollectEmail(false);
  form.addTextItem().setTitle('Your name or nickname').setRequired(false);
  form.addTextItem().setTitle('Contact detail (optional)').setRequired(false);
  form.addMultipleChoiceItem().setTitle('Content type').setChoiceValues(['Question','Answer','Explanation','Book/PDF','Past paper','Translation','Kankor info','Girls Education source','Website bug','Other']).setRequired(true);
  form.addTextItem().setTitle('Page / question / item reference').setRequired(false);
  form.addParagraphTextItem().setTitle('What is wrong?').setRequired(true);
  form.addParagraphTextItem().setTitle('Suggested correction').setRequired(false);
  form.addListItem().setTitle('Language').setChoiceValues(KEP_CONFIG.languageOptions).setRequired(false);
  form.setConfirmationMessage('Thank you. KEP will review this correction.');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheetId);
  return formLinkObject_('Correction Report Form', form);
}

function createVolunteerForm_(spreadsheetId) {
  const form = FormApp.create('KEP — Volunteer Application');
  form.setDescription('Join KEP as a contributor, reviewer, translator, collector, girls education support volunteer, or tester.');
  form.setCollectEmail(false);
  form.addTextItem().setTitle('Name').setRequired(false);
  form.addTextItem().setTitle('Contact detail (WhatsApp/email)').setRequired(true);
  form.addCheckboxItem().setTitle('How can you help?').setChoiceValues([
    'Question contributor','Teacher reviewer','Past paper collector','Translator','Girls Education support','Student tester','Technical support','Other'
  ]).setRequired(true);
  form.addCheckboxItem().setTitle('Subjects you can help with').setChoiceValues(KEP_CONFIG.subjectOptions).setRequired(false);
  form.addCheckboxItem().setTitle('Languages').setChoiceValues(KEP_CONFIG.languageOptions).setRequired(false);
  form.addTextItem().setTitle('Country / timezone').setRequired(false);
  form.addParagraphTextItem().setTitle('Experience / background').setRequired(false);
  form.addParagraphTextItem().setTitle('Availability').setRequired(false);
  form.setConfirmationMessage('Thank you for joining the KEP mission. We will contact you when the review system is ready.');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheetId);
  return formLinkObject_('Volunteer Application Form', form);
}

function formLinkObject_(label, form) {
  return {
    label: label,
    editUrl: form.getEditUrl(),
    publicUrl: form.getPublishedUrl(),
    id: form.getId(),
  };
}

function writeSetupLinks_(spreadsheet, links) {
  const rows = [['Form / Resource', 'Public URL', 'Edit URL', 'ID / Notes']];
  rows.push(['Master Spreadsheet', spreadsheet.getUrl(), spreadsheet.getUrl(), spreadsheet.getId()]);
  links.forEach(link => rows.push([link.label, link.publicUrl, link.editUrl, link.id]));
  writeSheet_(spreadsheet, 'Setup Links', rows);
  const sheet = spreadsheet.getSheetByName('Setup Links');
  sheet.autoResizeColumns(1, 4);
  sheet.setFrozenRows(1);
}

function writeReadme_(spreadsheet) {
  writeSheet_(spreadsheet, 'README', [
    ['KEP Content Workflow'],
    ['1', 'Collect submissions from Google Forms.'],
    ['2', 'Check source details and label as official, teacher-created, centre paper, collected, or unsure.'],
    ['3', 'Send to reviewer. Do not publish until reviewed.'],
    ['4', 'Translate if needed.'],
    ['5', 'Move approved content to Approved tabs.'],
    ['6', 'Later export approved content to website/database.'],
    ['Privacy', 'Forms do not automatically collect email. Contributors can share contact voluntarily.'],
  ]);
}

function writeSheet_(spreadsheet, name, rows) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  sheet.clear();
  if (rows.length) {
    const maxCols = Math.max(...rows.map(row => row.length));
    const paddedRows = rows.map(row => {
      const copy = row.slice();
      while (copy.length < maxCols) copy.push('');
      return copy;
    });
    sheet.getRange(1, 1, paddedRows.length, maxCols).setValues(paddedRows);
  }
}

function applyBasicFormatting_(spreadsheet) {
  spreadsheet.getSheets().forEach(sheet => {
    const lastCol = Math.max(sheet.getLastColumn(), 1);
    const lastRow = Math.max(sheet.getLastRow(), 1);
    sheet.getRange(1, 1, 1, lastCol)
      .setFontWeight('bold')
      .setBackground('#0f2f57')
      .setFontColor('#ffffff')
      .setWrap(true);
    sheet.getRange(1, 1, lastRow, lastCol).setVerticalAlignment('middle').setWrap(true);
    sheet.setFrozenRows(1);
    try { sheet.autoResizeColumns(1, lastCol); } catch (err) {}
  });
}

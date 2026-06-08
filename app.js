const nav = document.querySelector('.nav');
const toggle = document.querySelector('.mobile-toggle');
if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('open'));

const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
});

const commonTranslations = {
  en: {
    navHome:'Home', navKankor:'Kankor Info', navGirls:'Girls Education', navVolunteer:'Volunteer', navSubmit:'Submit Content', navReview:'Review', navSubjects:'Subjects', navLibrary:'Library', navPacks:'Study Packs', navPractice:'Practice', navDashboard:'Dashboard', navAdmin:'Admin', navStart:'Start Learning', footerDot:'Prepare dot by dot.',
    girlsEyebrow:'For Afghan girls', girlsTitle:'A special learning path for the girls whose school doors were closed.', girlsLead:'KEP must carry a dedicated space for girls who were stopped from secondary and higher education. This part will provide private, low-data learning, books, practice, confidence, and a message that their right to learn has not disappeared.', girlsButton:'Open Girls Education Space', girlsStart:'Start private study', counterLabel:'School doors closed for girls beyond Grade 6 for', counterUnit:'days', counterNote:'Counter starts from 23 March 2022, when girls’ secondary schools were closed again after a promised reopening.',
    girlsPageEyebrow:'Dedicated mission space', girlsPageTitle:'For the girls who were told to stop learning.', girlsPageLead:'This part of KEP is for Afghan girls whose school doors were closed beyond primary level. It must be private, respectful, low-data, and useful — a quiet space to continue learning dot by dot.', girlsLibrary:'Open books library', girlsWhyEyebrow:'Why this space exists', girlsWhyTitle:'KEP should never forget the students who were pushed out of the classroom.', girlsWhyLead:'This is not only a feature. It is the soul of the mission: education should remain reachable, even when the classroom is taken away.', girlsPrivateTitle:'Private learning', girlsPrivateText:'Students should be able to learn without exposing unnecessary personal information.', girlsLowDataTitle:'Low-data access', girlsLowDataText:'Pages, notes, PDFs, and practice should work well on simple phones and weak internet.', girlsHopeTitle:'Hope and confidence', girlsHopeText:'The platform should remind girls that their minds, dreams, and futures still matter.', girlsPlanEyebrow:'Girls learning pathway', girlsPlanTitle:'A gentle study route from foundation to Kankor readiness.', girlsPlanLead:'Some students may have missed months or years of formal schooling. This pathway should not shame them. It should help them rebuild step by step.', girlsPlanCardTitle:'What this section will include', girlsPlan1Title:'Foundation lessons', girlsPlan1Text:'Simple Math, Science, languages, and general knowledge from the basics.', girlsPlan2Title:'Private practice', girlsPlan2Text:'Daily questions, saved progress, and wrong-answer review.', girlsPlan3Title:'Kankor bridge', girlsPlan3Text:'A bridge from missed schooling toward exam preparation and dream-field paths.', girlsFinalEyebrow:'Design rule', girlsFinalTitle:'This section must be safe, calm, and respectful.', girlsFinalText:'No unnecessary identity questions. No pressure. No shame. Just a clear path: learn, practise, review, and keep going.', girlsPracticeButton:'Go to Practice',
    practiceBreadcrumb:'Home / Practice', practiceEyebrow:'MCQ Practice', practiceTitle:'Practise one question at a time.', practiceLead:'Choose a subject, select your language, answer questions, and review explanations. This is the first working learning feature of KEP.', practiceStartHero:'Start quiz', practiceGirlsHero:'Girls Education Space', practicePreviewLabel:'KEP learning loop', loopChoose:'Choose', loopAnswer:'Answer', loopReview:'Review', loopImprove:'Improve', quizEngineEyebrow:'Working demo', quizEngineTitle:'KEP Practice Engine', quizEngineLead:'Use sample questions, or load reviewed questions marked as Published from Google Sheets.', quizSettingsTitle:'Quiz settings', quizSubjectLabel:'Subject', quizLanguageLabel:'Question language', quizCountLabel:'Number of questions', startQuizBtn:'Start Quiz', privacyMiniTitle:'Private by design', privacyMiniText:'For now no login is needed. Students can practise without sharing personal information.', emptyQuizTitle:'Ready when you are.', emptyQuizText:'Choose your subject and language, then start. KEP will show your score and explanations at the end.', resultsEyebrow:'Result', scoreLabel:'Score', percentLabel:'Percentage', subjectLabel:'Subject', tryAgainBtn:'Try again', mockNextBtn:'Go to mock exam', modeSubjectTitle:'Subject Quiz', modeSubjectText:'Focus on one subject and build strong basics.', modeWeakTitle:'Weak Area Quiz', modeWeakText:'Later, KEP will repeat questions from your mistakes.', modeTimedTitle:'Timed Quiz', modeTimedText:'Practise speed and confidence before mock exams.', modeGirlsTitle:'Private Study', modeGirlsText:'Designed to support students who need quiet, safe learning access.', correctText:'Correct', wrongText:'Not quite', nextQuestionText:'Next question', resultTitleGood:'Strong work.', resultTitleTry:'Good start. Keep practising.', resultSummary:'You answered {score} out of {total} questions correctly.', explanationText:'Explanation', yourAnswerText:'Your answer', correctAnswerText:'Correct answer',
    subjectMath:'Mathematics', subjectBiology:'Biology', subjectEnglish:'English', subjectGeneral:'General Knowledge',
    
    submitBreadcrumb:'Home / Submit Content', submitEyebrow:'KEP content system', submitTitle:'Submit questions, papers, books, and corrections safely.', submitLead:'The live Google Forms are now connected. Volunteers can submit questions, past papers, books, notes, corrections, and applications into the KEP collection system.', submitQuestionButton:'Submit a question', submitPaperButton:'Submit a past paper', submitTrustTitle:'Trust before publishing.', submitTrustText:'Nothing should go to students until it has a source label, reviewer note, and approval status.', submitFlowEyebrow:'Submission flow', submitFlowTitle:'Every item should follow one clear path.', submitFlowLead:'This keeps KEP accurate, respectful, and useful for real students.', formTypesEyebrow:'Submission forms', formTypesTitle:'Choose what you want to contribute.', formTypesLead:'Use the live Google Forms for real submissions. The local sample forms below are kept only for website testing and future admin planning.', typeQuestionTitle:'Question / MCQ', typeQuestionText:'Add subject, chapter, options, answer, explanation, and source.', typePaperTitle:'Past paper', typePaperText:'Submit official, centre, teacher-shared, or collected papers with labels.', typeBookTitle:'Book / note', typeBookText:'Suggest useful books, notes, guides, or PDF resources.', typeCorrectionTitle:'Correction', typeCorrectionText:'Report wrong answers, unclear translations, or broken resources.', questionFormEyebrow:'Question contribution', questionFormTitle:'Add one clean MCQ.', questionFormLead:'Start small. One accurate question with explanation is more valuable than many random questions.', demoNotice:'Live form connected. Use the Google Form for real submissions; the local sample form is only for website testing.', formSubject:'Subject', formChapter:'Chapter', formDifficulty:'Difficulty', formQuestionText:'Question text', formCorrect:'Correct answer', formSource:'Source', formExplanation:'Explanation', saveSampleBtn:'Save sample locally', paperFormEyebrow:'Past paper contribution', paperFormTitle:'Label papers honestly.', paperFormLead:'If a paper is not official, KEP should not call it official. We can still use centre papers and teacher-shared papers with clear labels.', formTitle:'Title', formYear:'Year', formPaperType:'Paper type', formPermission:'Permission status', formLink:'File/link or note', bookFormEyebrow:'Book and notes', bookFormTitle:'Suggest learning resources.', bookFormLead:'Books, notes, guides, and formulas must have source and copyright status before publishing.', formGrade:'Grade/class', formCopyright:'Copyright status', correctionFormEyebrow:'Correction system', correctionFormTitle:'Let students and teachers report problems.', correctionFormLead:'This protects KEP quality. Every wrong answer report goes into the review queue.', formIssueType:'Issue type', formPage:'Page or question ID', exportEyebrow:'Demo exports', exportTitle:'Export local demo submissions.', exportLead:'While testing, you can save sample submissions and export them as JSON to understand the structure. Later this will be replaced by Google Forms or database storage.', exportButton:'Export JSON', clearButton:'Clear samples', contentSaved:'Sample saved locally. Real version will send this to the KEP content database.', contentCleared:'Local samples cleared.',
    volHomeEyebrow:'Community mission', volHomeTitle:'KEP should be built with teachers, students, and volunteers.', volHomeLead:'To make KEP trusted, we need people who can collect past papers, write questions from textbooks, review answers, translate content, and test the platform with real students.', volHomeButton:'Join as Volunteer', volHomeContribute:'Contribute questions or papers', volMini1:'Collect', volMini2:'Review', volMini3:'Translate', volMini4:'Publish',
    volBreadcrumb:'Home / Volunteer', volEyebrow:'Join the mission', volTitle:'Help build KEP for Afghan students.', volLead:'KEP needs volunteers who can collect learning materials, write MCQs, review answers, translate content, test pages, and support the Girls Education Space with respectful self-study resources.', volJoinButton:'Join as Volunteer', volPipelineButton:'See review process', volHeroCardTitle:'Trusted content starts with people.', volHeroCardText:'Every question, paper, and translation should pass through a clear source and review system before reaching students.', statusCollected:'Collected', statusReviewed:'Reviewed', statusPublished:'Published', rolesEyebrow:'Volunteer roles', rolesTitle:'Different people can help KEP in different ways.', rolesLead:'Some volunteers can write questions. Some can review. Some can translate. Some can collect past papers or test the platform.', roleQuestionsTitle:'Question contributors', roleQuestionsText:'Create curriculum-based MCQs with options, correct answer, explanation, difficulty, and source.', roleReviewTitle:'Teacher reviewers', roleReviewText:'Check if answers are correct, explanations are clear, and the question matches the subject.', rolePapersTitle:'Past paper collectors', rolePapersText:'Help find official papers, centre papers, teacher-shared sheets, and mark source quality clearly.', roleTranslateTitle:'Translators', roleTranslateText:'Translate key content into Pashto, Dari, and English in simple student-friendly language.', roleGirlsTitle:'Girls Education support', roleGirlsText:'Help create gentle self-study plans, foundation packs, and private learning resources for girls.', roleTestTitle:'Student testers', roleTestText:'Use the website and tell us what is confusing, slow, incorrect, or useful for real students.', pipelineEyebrow:'Trust system', pipelineTitle:'No random content should go straight to students.', pipelineLead:'KEP should protect trust by using source labels and a review process before publishing questions, books, and past papers.', pipeCollectTitle:'Collect', pipeCollectText:'Receive questions, books, notes, or papers with source details.', pipeCheckTitle:'Check source', pipeCheckText:'Label as official, textbook-based, centre paper, teacher-shared, or unverified.', pipeReviewTitle:'Review', pipeReviewText:'A reviewer checks the answer, explanation, language, and difficulty.', pipePublishTitle:'Publish', pipePublishText:'Only approved content appears on KEP with the correct label.', joinEyebrow:'Volunteer form', joinTitle:'Tell KEP how you can help.', joinLead:'The real volunteer application is now connected to Google Forms. Use the live form so responses go into the KEP review system.', joinPrivacy:'Use the live Google Form for real applications. The local form on this page is only a website testing sample.', formName:'Name', formContact:'Contact', formRole:'I can help as', formLanguage:'Languages', formMessage:'Message', formSubmit:'Save local test sample', contribEyebrow:'Content contribution', contribTitle:'Prepare content the right way.', contribLead:'Every contributed question or paper needs subject, chapter, language, answer, explanation, and source. This will make the future admin panel clean.', questionChecklistTitle:'Question checklist', paperChecklistTitle:'Past paper checklist', qc1:'Subject and chapter', qc2:'Question text', qc3:'Four answer options', qc4:'Correct answer', qc5:'Short explanation', qc6:'Source and difficulty', pc1:'Year or centre name', pc2:'Official or collected label', pc3:'Subject or full paper', pc4:'Language', pc5:'Permission status', pc6:'Reviewer name or note', volunteerSaved:'Volunteer sample saved locally. Real version will send this to the KEP team.'
  },
  ps: {
    navHome:'کور', navKankor:'د کانکور معلومات', navGirls:'د نجونو زده‌کړه', navVolunteer:'رضاکاران', navSubmit:'منځپانګه', navSubjects:'مضمونونه', navLibrary:'کتابتون', navPacks:'د زده‌کړې بستې', navPractice:'تمرین', navDashboard:'ډشبورډ', navAdmin:'اډمین', navStart:'زده‌کړه پیل کړه', footerDot:'ټکي په ټکي چمتووالی.',
    girlsEyebrow:'د افغان نجونو لپاره', girlsTitle:'د هغو نجونو لپاره ځانګړې زده‌کړه چې د ښوونځي دروازې پرې تړل شوې.', girlsLead:'KEP باید د هغو نجونو لپاره ځانګړی ځای ولري چې له ثانوي او لوړو زده‌کړو منع شوې دي. دا برخه به شخصي، کم‌انټرنېټي، ساده او ګټوره زده‌کړه، کتابونه، تمرین، باور او دا پیغام ورکړي چې د زده‌کړې حق یې نه دی ورک شوی.', girlsButton:'د نجونو د زده‌کړې برخه پرانیزه', girlsStart:'شخصي زده‌کړه پیل کړه', counterLabel:'له شپږم ټولګي پورته د نجونو د ښوونځي دروازې تړل شوې د', counterUnit:'ورځو لپاره', counterNote:'دا شمېرنه د ۲۰۲۲ د مارچ له ۲۳مې پیل شوې، هغه ورځ چې د بیا پرانیستلو له ژمنې وروسته د نجونو ثانوي ښوونځي بیا وتړل شول.',
    girlsPageEyebrow:'ځانګړی ماموریت', girlsPageTitle:'د هغو نجونو لپاره چې ورته وویل شول زده‌کړه بس کړئ.', girlsPageLead:'دا د KEP هغه برخه ده چې د هغو افغان نجونو لپاره ده چې له لومړني ښوونځي وروسته د ښوونځي دروازې پرې وتړل شوې. دا ځای باید شخصي، بااحترامه، کم‌انټرنېټي او ګټور وي — یو ارام ځای چې زده‌کړه پکې ټکي په ټکي روانه وي.', girlsLibrary:'د کتابتون برخه', girlsWhyEyebrow:'ولې دا برخه شته؟', girlsWhyTitle:'KEP باید هغه زده‌کوونکې هېڅکله هېرې نه کړي چې له ټولګي څخه وویستل شوې.', girlsWhyLead:'دا یوازې یو فیچر نه دی. دا د ماموریت روح دی: زده‌کړه باید د لاسرسي وړ پاتې شي، حتی که ټولګی ترې واخیستل شي.', girlsPrivateTitle:'شخصي زده‌کړه', girlsPrivateText:'زده‌کوونکې باید وکولای شي بې له غیرضروري شخصي معلوماتو زده‌کړه وکړي.', girlsLowDataTitle:'کم‌انټرنېټ لاسرسی', girlsLowDataText:'پاڼې، یادښتونه، PDF کتابونه او تمرین باید په ساده موبایل او کمزورې انټرنېټ کې هم ښه کار وکړي.', girlsHopeTitle:'هیله او باور', girlsHopeText:'پلاتفورم باید نجونو ته ور یاد کړي چې ذهن، خوبونه او راتلونکی یې لا هم ارزښت لري.', girlsPlanEyebrow:'د نجونو د زده‌کړې لاره', girlsPlanTitle:'له بنسټیزې زده‌کړې تر کانکور چمتووالي پورې نرمه او روښانه لاره.', girlsPlanLead:'ځینې زده‌کوونکې ښايي میاشتې یا کلونه له رسمي زده‌کړې پاتې شوې وي. دا لاره باید هغوی ونه شرموي؛ باید ورسره مرسته وکړي چې ګام په ګام بیا ځان جوړ کړي.', girlsPlanCardTitle:'په دې برخه کې به څه وي؟', girlsPlan1Title:'بنسټیز درسونه', girlsPlan1Text:'ساده ریاضي، ساینس، ژبې او عمومي معلومات له بنسټ څخه.', girlsPlan2Title:'شخصي تمرین', girlsPlan2Text:'ورځنۍ پوښتنې، خوندي پرمختګ او د غلطو ځوابونو بیاکتنه.', girlsPlan3Title:'د کانکور پُل', girlsPlan3Text:'له پاتې زده‌کړې څخه د کانکور چمتووالي او د خوبونو مسلکونو ته یو پُل.', girlsFinalEyebrow:'د ډیزاین اصل', girlsFinalTitle:'دا برخه باید خوندي، ارامه او بااحترامه وي.', girlsFinalText:'غیرضروري هویتي پوښتنې نه. فشار نه. شرم نه. یوازې روښانه لاره: زده‌کړه، تمرین، بیاکتنه، او دوام.', girlsPracticeButton:'تمرین ته لاړ شه',
    practiceBreadcrumb:'کور / تمرین', practiceEyebrow:'د MCQ تمرین', practiceTitle:'یوه پوښتنه، یو ګام.', practiceLead:'مضمون وټاکه، ژبه وټاکه، پوښتنو ته ځواب ورکړه، او تشریحات وګوره. دا د KEP لومړنی فعاله زده‌کړیز فیچر دی.', practiceStartHero:'ازموینه پیل کړه', practiceGirlsHero:'د نجونو د زده‌کړې ځای', practicePreviewLabel:'د KEP د زده‌کړې کړۍ', loopChoose:'ټاکنه', loopAnswer:'ځواب', loopReview:'بیاکتنه', loopImprove:'ښه والی', quizEngineEyebrow:'فعاله نمونه', quizEngineTitle:'د KEP د تمرین سیستم', quizEngineLead:'د نمونې پوښتنې وکاروه، یا هغه پوښتنې راواخله چې په Google Sheets کې Published شوي وي.', quizSettingsTitle:'د ازموینې تنظیمات', quizSubjectLabel:'مضمون', quizLanguageLabel:'د پوښتنو ژبه', quizCountLabel:'د پوښتنو شمېر', startQuizBtn:'ازموینه پیل کړه', privacyMiniTitle:'شخصي ډیزاین', privacyMiniText:'اوس لاګین ته اړتیا نشته. زده‌کوونکي کولی شي بې له شخصي معلوماتو تمرین وکړي.', emptyQuizTitle:'هر وخت چمتو یې.', emptyQuizText:'مضمون او ژبه وټاکه، بیا پیل کړه. KEP به په پای کې نمرې او تشریحات وښيي.', resultsEyebrow:'نتیجه', scoreLabel:'نمرې', percentLabel:'سلنه', subjectLabel:'مضمون', tryAgainBtn:'بیا هڅه وکړه', mockNextBtn:'Mock exam ته لاړ شه', modeSubjectTitle:'د مضمون تمرین', modeSubjectText:'په یوه مضمون تمرکز وکړه او بنسټ قوي کړه.', modeWeakTitle:'د کمزورۍ تمرین', modeWeakText:'وروسته KEP به ستا غلطې پوښتنې بیا تکراروي.', modeTimedTitle:'وخت لرونکی تمرین', modeTimedText:'د mock exam مخکې سرعت او باور جوړ کړه.', modeGirlsTitle:'شخصي زده‌کړه', modeGirlsText:'د هغو زده‌کوونکو لپاره چې ارام او خوندي لاسرسی غواړي.', correctText:'سم', wrongText:'نږدې نه و', nextQuestionText:'بله پوښتنه', resultTitleGood:'ډېر ښه کار.', resultTitleTry:'ښه پیل دی. تمرین ته دوام ورکړه.', resultSummary:'تا له {total} پوښتنو څخه {score} سمې ځواب کړې.', explanationText:'تشریح', yourAnswerText:'ستا ځواب', correctAnswerText:'سم ځواب',
    subjectMath:'ریاضي', subjectBiology:'بیولوژي', subjectEnglish:'انګلیسي', subjectGeneral:'عمومي معلومات',
    
    submitBreadcrumb:'کور / منځپانګه', submitEyebrow:'د KEP د منځپانګې سیستم', submitTitle:'پوښتنې، پارچې، کتابونه او اصلاحات په منظم ډول وسپارئ.', submitLead:'دا د KEP لپاره د سپارلو لومړنی مخکینی سیستم دی. دا له رضاکارانو سره مرسته کوي چې منځپانګه په پاک جوړښت کې برابره کړي، مخکې له دې چې Google Forms، Google Sheets، Supabase، Firebase یا اډمین پینل سره وصل شي.', submitQuestionButton:'پوښتنه وسپارئ', submitPaperButton:'تېرې پارچې وسپارئ', submitTrustTitle:'له خپرولو مخکې باور.', submitTrustText:'هیڅ شی باید زده کوونکو ته لاړ نه شي تر څو سرچینه، د کتونکي یادونه او د منلو حالت ونه لري.', submitFlowEyebrow:'د سپارلو لاره', submitFlowTitle:'هر شی باید یوه روښانه لاره ولري.', submitFlowLead:'دا KEP دقیق، درناوی لرونکی او د زده کوونکو لپاره ګټور ساتي.', formTypesEyebrow:'د سپارلو فورمې', formTypesTitle:'هغه څه وټاکئ چې مرسته ورسره کوئ.', formTypesLead:'دا فورمې اوس د نمونې لپاره په براوزر کې ساتل کېږي. اصلي نسخه به ډاټا د KEP منځپانګې ډیټابېس ته لېږي.', typeQuestionTitle:'پوښتنه / MCQ', typeQuestionText:'مضمون، فصل، انتخابونه، سم ځواب، تشریح او سرچینه اضافه کړئ.', typePaperTitle:'تېره پارچه', typePaperText:'رسمي، د مرکز، د استاد له خوا شریکه شوې یا راټوله شوې پارچه په روښانه نوم وسپارئ.', typeBookTitle:'کتاب / یادښت', typeBookText:'ګټور کتابونه، یادښتونه، لارښودونه یا PDF سرچینې وړاندیز کړئ.', typeCorrectionTitle:'اصلاح', typeCorrectionText:'غلط ځوابونه، ناڅرګندې ژباړې یا ماتې سرچینې راپور کړئ.', questionFormEyebrow:'د پوښتنې مرسته', questionFormTitle:'یوه پاکه MCQ اضافه کړئ.', questionFormLead:'کوچنی پیل وکړئ. یوه دقیقه پوښتنه له تشریح سره د ډېرو بې باوره پوښتنو نه غوره ده.', demoNotice:'یوازې نمونه: دا ستاسو په براوزر کې ساتل کېږي. شخصي اسناد مه سپارئ.', formSubject:'مضمون', formChapter:'فصل', formDifficulty:'سختوالی', formQuestionText:'د پوښتنې متن', formCorrect:'سم ځواب', formSource:'سرچینه', formExplanation:'تشریح', saveSampleBtn:'نمونه محلي وساتئ', paperFormEyebrow:'د تېرې پارچې مرسته', paperFormTitle:'پارچې په رښتینولۍ ونوموئ.', paperFormLead:'که پارچه رسمي نه وي، KEP باید هغه رسمي ونه بولي. د مرکز یا استاد پارچې هم کارېدلی شي خو په روښانه نوم.', formTitle:'سرلیک', formYear:'کال', formPaperType:'د پارچې ډول', formPermission:'د اجازې حالت', formLink:'فایل/لینک یا یادونه', bookFormEyebrow:'کتابونه او یادښتونه', bookFormTitle:'د زده کړې سرچینې وړاندیز کړئ.', bookFormLead:'کتابونه، یادښتونه او فورمولونه باید له سرچینې او کاپي رایټ حالت سره خپاره شي.', formGrade:'ټولګی/کلاس', formCopyright:'د کاپي رایټ حالت', correctionFormEyebrow:'د اصلاح سیستم', correctionFormTitle:'زده کوونکي او استادان ستونزې راپور کړي.', correctionFormLead:'دا د KEP کیفیت ساتي. هر غلط ځواب د بیاکتنې کتار ته ځي.', formIssueType:'د ستونزې ډول', formPage:'مخ یا د پوښتنې ID', exportEyebrow:'د نمونې صادرول', exportTitle:'محلي نمونې صادرې کړئ.', exportLead:'د ازموینې پر مهال نمونې ساتلی او JSON بڼه یې صادرولی شئ.', exportButton:'JSON صادر کړئ', clearButton:'نمونې پاکې کړئ', contentSaved:'نمونه محلي وساتل شوه. اصلي نسخه به دا د KEP ډیټابېس ته ولېږي.', contentCleared:'محلي نمونې پاکې شوې.',
    volHomeEyebrow:'د ټولنې ماموریت', volHomeTitle:'KEP باید د استادانو، زده‌کوونکو او رضاکارانو په مرسته جوړ شي.', volHomeLead:'د KEP د باور لپاره موږ خلکو ته اړتیا لرو چې پخوانۍ پاڼې راټولې کړي، له کتابونو پوښتنې جوړې کړي، ځوابونه وګوري، ژباړه وکړي او پلاتفورم له اصلي زده‌کوونکو سره وازمويي.', volHomeButton:'د رضاکار په توګه یوځای شه', volHomeContribute:'پوښتنې یا پاڼې شریکې کړه', volMini1:'راټولول', volMini2:'بیاکتنه', volMini3:'ژباړه', volMini4:'خپرول',
    volBreadcrumb:'کور / رضاکاران', volEyebrow:'له ماموریت سره یوځای شه', volTitle:'د افغان زده‌کوونکو لپاره د KEP په جوړولو کې مرسته وکړه.', volLead:'KEP هغو رضاکارانو ته اړتیا لري چې مواد راټول کړي، MCQ پوښتنې جوړې کړي، ځوابونه وګوري، ژباړه وکړي، پاڼې وازمويي او د نجونو د زده‌کړې برخه په درناوي سره پیاوړې کړي.', volJoinButton:'رضاکار شه', volPipelineButton:'د بیاکتنې بهیر وګوره', volHeroCardTitle:'باوري محتوا له خلکو پیلېږي.', volHeroCardText:'هره پوښتنه، پاڼه او ژباړه باید د سرچینې او بیاکتنې له واضح بهیر څخه تېر شي.', statusCollected:'راټول شوي', statusReviewed:'کتل شوي', statusPublished:'خپاره شوي', rolesEyebrow:'د رضاکارانو رولونه', rolesTitle:'بېلابېل خلک KEP ته په بېلابېلو لارو مرسته کولی شي.', rolesLead:'ځینې پوښتنې جوړوي، ځینې بیاکتنه کوي، ځینې ژباړه کوي، ځینې پخوانۍ پاڼې راټولوي یا پلاتفورم ازمويي.', roleQuestionsTitle:'د پوښتنو جوړوونکي', roleQuestionsText:'له نصاب څخه MCQ پوښتنې د انتخابونو، سم ځواب، تشریح، ستونزمنتیا او سرچینې سره جوړوي.', roleReviewTitle:'د استادانو بیاکتنه', roleReviewText:'ګوري چې ځواب سم دی، تشریح روښانه ده او پوښتنه له مضمون سره برابره ده.', rolePapersTitle:'د پخوانیو پاڼو راټولوونکي', rolePapersText:'رسمي پاڼې، د مرکزونو پاڼې او د استادانو شریکې پاڼې راټولوي او سرچینه یې روښانه کوي.', roleTranslateTitle:'ژباړونکي', roleTranslateText:'مهمه محتوا په پښتو، دري او انګلیسي ساده ژبه ژباړي.', roleGirlsTitle:'د نجونو د زده‌کړې ملاتړ', roleGirlsText:'د نجونو لپاره نرمه ځان-زده‌کړه، بنسټیزې پاڼې او شخصي زده‌کړیز مواد جوړوي.', roleTestTitle:'زده‌کوونکي ازموینوونکي', roleTestText:'وېبپاڼه کاروي او وايي څه ګډوډ، ورو، ناسم یا ګټور دي.', pipelineEyebrow:'د باور سیستم', pipelineTitle:'تصادفي محتوا باید مستقیم زده‌کوونکو ته ولاړه نه شي.', pipelineLead:'KEP باید د سرچینې نښې او بیاکتنې له لارې پوښتنې، کتابونه او پاڼې خوندي او باوري کړي.', pipeCollectTitle:'راټولول', pipeCollectText:'پوښتنې، کتابونه، یادښتونه یا پاڼې د سرچینې له معلوماتو سره ترلاسه کول.', pipeCheckTitle:'سرچینه کتل', pipeCheckText:'رسمي، د کتاب له مخې، د مرکز پاڼه، د استاد شریکه پاڼه یا نا تایید شوې په توګه نښه کول.', pipeReviewTitle:'بیاکتنه', pipeReviewText:'بیاکتونکی ځواب، تشریح، ژبه او ستونزمنتیا ګوري.', pipePublishTitle:'خپرول', pipePublishText:'یوازې تایید شوې محتوا له سمې نښې سره په KEP کې خپرېږي.', joinEyebrow:'د رضاکار فورم', joinTitle:'KEP ته ووایه چې څنګه مرسته کولی شې.', joinLead:'دا اوس د مخکینۍ برخې نمونه فورم دی. په اصلي نسخه کې به Google Forms، Supabase، Firebase یا خوندي اډمین پینل سره وصل شي.', joinPrivacy:'دلته لا شخصي یا حساس اسناد مه لېږه. دا نمونه یوازې ستا په براوزر کې ځایي ساتل کېږي.', formName:'نوم', formContact:'اړیکه', formRole:'زه مرسته کولی شم د', formLanguage:'ژبې', formMessage:'پیغام', formSubmit:'د رضاکار نمونه وساته', contribEyebrow:'د محتوا مرسته', contribTitle:'محتوا په سمه طریقه چمتو کړه.', contribLead:'هره پوښتنه یا پاڼه باید مضمون، څپرکی، ژبه، ځواب، تشریح او سرچینه ولري. دا به راتلونکی اډمین پینل منظم کړي.', questionChecklistTitle:'د پوښتنې چک لېست', paperChecklistTitle:'د پخوانۍ پاڼې چک لېست', qc1:'مضمون او څپرکی', qc2:'د پوښتنې متن', qc3:'څلور انتخابونه', qc4:'سم ځواب', qc5:'لنډه تشریح', qc6:'سرچینه او ستونزمنتیا', pc1:'کال یا د مرکز نوم', pc2:'رسمي یا راټوله شوې نښه', pc3:'مضمون یا بشپړه پاڼه', pc4:'ژبه', pc5:'د اجازې حالت', pc6:'د بیاکتونکي نوم یا یادښت', volunteerSaved:'د رضاکار نمونه ځایي وساتل شوه. اصلي نسخه به یې د KEP ټیم ته ولېږي.'
  },
  fa: {
    navHome:'خانه', navKankor:'معلومات کانکور', navGirls:'آموزش دختران', navVolunteer:'داوطلبان', navSubmit:'ارسال محتوا', navSubjects:'مضمون‌ها', navLibrary:'کتابخانه', navPacks:'بسته‌های درسی', navPractice:'تمرین', navDashboard:'داشبورد', navAdmin:'ادمین', navStart:'شروع یادگیری', footerDot:'آمادگی قدم به قدم.',
    girlsEyebrow:'برای دختران افغان', girlsTitle:'یک مسیر ویژه برای دخترانی که دروازه‌های مکتب به روی‌شان بسته شد.', girlsLead:'KEP باید یک بخش اختصاصی برای دخترانی داشته باشد که از آموزش متوسطه و عالی بازمانده‌اند. این بخش آموزش خصوصی، کم‌مصرف، کتاب‌ها، تمرین، اعتمادبه‌نفس و این پیام را می‌دهد که حق آموزش آنان از بین نرفته است.', girlsButton:'باز کردن بخش آموزش دختران', girlsStart:'شروع مطالعه خصوصی', counterLabel:'دروازه‌های مکتب برای دختران بالاتر از صنف ششم بسته است به مدت', counterUnit:'روز', counterNote:'این شمارش از ۲۳ مارچ ۲۰۲۲ آغاز می‌شود؛ روزی که مکاتب متوسطه دختران پس از وعده بازگشایی دوباره بسته شدند.',
    girlsPageEyebrow:'بخش مأموریت ویژه', girlsPageTitle:'برای دخترانی که به آنان گفته شد دیگر درس نخوانند.', girlsPageLead:'این بخش KEP برای دختران افغان است که پس از سطح ابتدایی دروازه‌های مکتب به روی‌شان بسته شد. این فضا باید خصوصی، محترمانه، کم‌مصرف و مفید باشد — جایی آرام برای ادامه آموزش، قدم به قدم.', girlsLibrary:'باز کردن کتابخانه', girlsWhyEyebrow:'چرا این بخش وجود دارد؟', girlsWhyTitle:'KEP نباید شاگردانی را فراموش کند که از صنف بیرون رانده شدند.', girlsWhyLead:'این فقط یک قابلیت نیست. روح مأموریت است: آموزش باید در دسترس بماند، حتی وقتی صنف از شاگرد گرفته شود.', girlsPrivateTitle:'آموزش خصوصی', girlsPrivateText:'شاگردان باید بتوانند بدون افشای معلومات شخصی غیرضروری درس بخوانند.', girlsLowDataTitle:'دسترسی کم‌مصرف', girlsLowDataText:'صفحات، یادداشت‌ها، فایل‌های PDF و تمرین‌ها باید روی موبایل ساده و اینترنت ضعیف هم خوب کار کند.', girlsHopeTitle:'امید و اعتماد', girlsHopeText:'پلتفرم باید به دختران یادآوری کند که ذهن، رویاها و آینده‌شان هنوز ارزش دارد.', girlsPlanEyebrow:'مسیر آموزشی دختران', girlsPlanTitle:'یک مسیر آرام از بنیادهای آموزشی تا آمادگی کانکور.', girlsPlanLead:'بعضی شاگردان ممکن است ماه‌ها یا سال‌ها از آموزش رسمی دور مانده باشند. این مسیر نباید آنان را شرمنده کند؛ باید کمک کند قدم به قدم دوباره بسازند.', girlsPlanCardTitle:'این بخش شامل چه خواهد بود؟', girlsPlan1Title:'درس‌های بنیادی', girlsPlan1Text:'ریاضی ساده، ساینس، زبان‌ها و معلومات عمومی از اساسات.', girlsPlan2Title:'تمرین خصوصی', girlsPlan2Text:'سوال‌های روزانه، ثبت پیشرفت و مرور جواب‌های غلط.', girlsPlan3Title:'پل کانکور', girlsPlan3Text:'پلی از آموزش از دست‌رفته به آمادگی کانکور و مسیرهای رشته دلخواه.', girlsFinalEyebrow:'قاعده طراحی', girlsFinalTitle:'این بخش باید امن، آرام و محترمانه باشد.', girlsFinalText:'پرسش‌های هویتی غیرضروری نه. فشار نه. شرم نه. فقط یک مسیر روشن: یادگیری، تمرین، مرور و ادامه دادن.', girlsPracticeButton:'رفتن به تمرین',
    practiceBreadcrumb:'خانه / تمرین', practiceEyebrow:'تمرین MCQ', practiceTitle:'یک سوال، یک قدم.', practiceLead:'مضمون را انتخاب کن، زبان را انتخاب کن، به سوال‌ها جواب بده و توضیحات را مرور کن. این اولین قابلیت فعال آموزشی KEP است.', practiceStartHero:'شروع آزمون', practiceGirlsHero:'بخش آموزش دختران', practicePreviewLabel:'چرخه یادگیری KEP', loopChoose:'انتخاب', loopAnswer:'جواب', loopReview:'مرور', loopImprove:'بهبود', quizEngineEyebrow:'نمونه فعال', quizEngineTitle:'سیستم تمرین KEP', quizEngineLead:'از سوال‌های نمونه استفاده کن، یا سوال‌هایی را بارگذاری کن که در Google Sheets حالت Published دارند.', quizSettingsTitle:'تنظیمات آزمون', quizSubjectLabel:'مضمون', quizLanguageLabel:'زبان سوال‌ها', quizCountLabel:'تعداد سوال‌ها', startQuizBtn:'شروع آزمون', privacyMiniTitle:'خصوصی از ابتدا', privacyMiniText:'فعلاً نیاز به ورود نیست. شاگردان می‌توانند بدون شریک‌ساختن معلومات شخصی تمرین کنند.', emptyQuizTitle:'هر وقت آماده هستی.', emptyQuizText:'مضمون و زبان را انتخاب کن و شروع کن. KEP در پایان نمره و توضیحات را نشان می‌دهد.', resultsEyebrow:'نتیجه', scoreLabel:'نمره', percentLabel:'فیصدی', subjectLabel:'مضمون', tryAgainBtn:'دوباره تلاش کن', mockNextBtn:'رفتن به امتحان آزمایشی', modeSubjectTitle:'تمرین مضمون', modeSubjectText:'روی یک مضمون تمرکز کن و اساسات را قوی بساز.', modeWeakTitle:'تمرین نقاط ضعف', modeWeakText:'بعداً KEP سوال‌های اشتباهت را دوباره تکرار می‌کند.', modeTimedTitle:'تمرین زمان‌دار', modeTimedText:'قبل از امتحان آزمایشی سرعت و اعتماد بساز.', modeGirlsTitle:'مطالعه خصوصی', modeGirlsText:'برای شاگردانی که به دسترسی آرام و امن نیاز دارند.', correctText:'درست', wrongText:'کاملاً نه', nextQuestionText:'سوال بعدی', resultTitleGood:'کار عالی.', resultTitleTry:'شروع خوبی است. تمرین را ادامه بده.', resultSummary:'تو از {total} سوال، {score} سوال را درست جواب دادی.', explanationText:'توضیح', yourAnswerText:'جواب تو', correctAnswerText:'جواب درست',
    subjectMath:'ریاضی', subjectBiology:'بیولوژی', subjectEnglish:'انگلیسی', subjectGeneral:'معلومات عمومی',
    
    submitBreadcrumb:'خانه / ارسال محتوا', submitEyebrow:'سیستم محتوای KEP', submitTitle:'پرسش‌ها، پارچه‌ها، کتاب‌ها و اصلاحات را منظم ارسال کنید.', submitLead:'این نخستین سیستم فرانت‌اند برای ارسال محتوای KEP است. به داوطلبان کمک می‌کند محتوا را با ساختار پاک آماده کنند، پیش از اتصال به Google Forms، Google Sheets، Supabase، Firebase یا پنل مدیریت آینده.', submitQuestionButton:'ارسال پرسش', submitPaperButton:'ارسال پارچه گذشته', submitTrustTitle:'اعتماد پیش از نشر.', submitTrustText:'هیچ محتوا نباید به دانش‌آموزان برسد تا زمانی که برچسب منبع، یادداشت بازبین و وضعیت تایید داشته باشد.', submitFlowEyebrow:'روند ارسال', submitFlowTitle:'هر مورد باید یک مسیر روشن داشته باشد.', submitFlowLead:'این کار KEP را دقیق، محترمانه و مفید برای دانش‌آموزان نگه می‌دارد.', formTypesEyebrow:'فورم‌های ارسال', formTypesTitle:'انتخاب کنید چه چیزی را کمک می‌کنید.', formTypesLead:'این فورم‌ها فعلاً نمونه‌ها را در مرورگر شما ذخیره می‌کند. نسخه واقعی داده را به دیتابیس محتوای KEP می‌فرستد.', typeQuestionTitle:'پرسش / MCQ', typeQuestionText:'مضمون، فصل، گزینه‌ها، پاسخ درست، توضیح و منبع را اضافه کنید.', typePaperTitle:'پارچه گذشته', typePaperText:'پارچه رسمی، مرکز، استاد یا جمع‌آوری‌شده را با برچسب روشن ارسال کنید.', typeBookTitle:'کتاب / یادداشت', typeBookText:'کتاب‌ها، یادداشت‌ها، راهنماها یا منابع PDF مفید را پیشنهاد کنید.', typeCorrectionTitle:'اصلاح', typeCorrectionText:'پاسخ‌های غلط، ترجمه‌های نامفهوم یا منابع خراب را گزارش دهید.', questionFormEyebrow:'کمک پرسش', questionFormTitle:'یک MCQ پاک اضافه کنید.', questionFormLead:'کوچک شروع کنید. یک پرسش دقیق با توضیح از چندین پرسش تصادفی ارزشمندتر است.', demoNotice:'فقط نمونه: این در مرورگر شما ذخیره می‌شود. اسناد خصوصی را هنوز ارسال نکنید.', formSubject:'مضمون', formChapter:'فصل', formDifficulty:'درجه سختی', formQuestionText:'متن پرسش', formCorrect:'پاسخ درست', formSource:'منبع', formExplanation:'توضیح', saveSampleBtn:'ذخیره نمونه در مرورگر', paperFormEyebrow:'کمک پارچه گذشته', paperFormTitle:'پارچه‌ها را صادقانه برچسب بزنید.', paperFormLead:'اگر پارچه رسمی نیست، KEP نباید آن را رسمی بنامد. پارچه‌های مرکز و استاد هم با برچسب روشن قابل استفاده‌اند.', formTitle:'عنوان', formYear:'سال', formPaperType:'نوع پارچه', formPermission:'وضعیت اجازه', formLink:'فایل/لینک یا یادداشت', bookFormEyebrow:'کتاب و یادداشت', bookFormTitle:'منابع آموزشی پیشنهاد کنید.', bookFormLead:'کتاب‌ها، یادداشت‌ها و فورمول‌ها باید با منبع و وضعیت حق نشر بررسی شوند.', formGrade:'صنف/کلاس', formCopyright:'وضعیت حق نشر', correctionFormEyebrow:'سیستم اصلاح', correctionFormTitle:'دانش‌آموزان و استادان مشکلات را گزارش کنند.', correctionFormLead:'این کیفیت KEP را حفظ می‌کند. هر گزارش پاسخ غلط وارد صف بازبینی می‌شود.', formIssueType:'نوع مشکل', formPage:'صفحه یا ID پرسش', exportEyebrow:'خروجی نمونه', exportTitle:'نمونه‌های محلی را صادر کنید.', exportLead:'در زمان تست می‌توانید نمونه‌ها را ذخیره و به شکل JSON صادر کنید.', exportButton:'خروجی JSON', clearButton:'پاک کردن نمونه‌ها', contentSaved:'نمونه در مرورگر ذخیره شد. نسخه واقعی آن را به دیتابیس KEP می‌فرستد.', contentCleared:'نمونه‌های محلی پاک شد.',
    volHomeEyebrow:'ماموریت جمعی', volHomeTitle:'KEP باید با کمک استادان، شاگردان و داوطلبان ساخته شود.', volHomeLead:'برای قابل اعتماد ساختن KEP، به افرادی نیاز داریم که پارچه‌های گذشته را جمع کنند، از کتاب‌ها سوال بسازند، جواب‌ها را بررسی کنند، ترجمه کنند و پلتفرم را با شاگردان واقعی آزمایش کنند.', volHomeButton:'به عنوان داوطلب بپیوند', volHomeContribute:'سوال یا پارچه شریک کن', volMini1:'جمع‌آوری', volMini2:'مرور', volMini3:'ترجمه', volMini4:'نشر',
    volBreadcrumb:'خانه / داوطلبان', volEyebrow:'به مأموریت بپیوند', volTitle:'در ساخت KEP برای شاگردان افغان کمک کن.', volLead:'KEP به داوطلبانی نیاز دارد که مواد آموزشی جمع کنند، سوال‌های MCQ بسازند، جواب‌ها را بررسی کنند، محتوا را ترجمه کنند، صفحات را آزمایش کنند و بخش آموزش دختران را با منابع خودآموز محترمانه تقویت کنند.', volJoinButton:'داوطلب شو', volPipelineButton:'روند بررسی را ببین', volHeroCardTitle:'محتوای قابل اعتماد از مردم شروع می‌شود.', volHeroCardText:'هر سوال، پارچه و ترجمه باید قبل از رسیدن به شاگردان از روند روشن منبع و بررسی بگذرد.', statusCollected:'جمع شده', statusReviewed:'بررسی شده', statusPublished:'نشر شده', rolesEyebrow:'نقش‌های داوطلبی', rolesTitle:'افراد مختلف می‌توانند به روش‌های مختلف به KEP کمک کنند.', rolesLead:'بعضی داوطلبان سوال می‌نویسند، بعضی بررسی می‌کنند، بعضی ترجمه می‌کنند، بعضی پارچه‌های گذشته را جمع می‌کنند یا پلتفرم را آزمایش می‌کنند.', roleQuestionsTitle:'سازندگان سوال', roleQuestionsText:'سوال‌های MCQ مبتنی بر نصاب را با گزینه‌ها، جواب درست، توضیح، سطح دشواری و منبع بسازند.', roleReviewTitle:'بررسی استادان', roleReviewText:'بررسی کنند که جواب درست است، توضیح واضح است و سوال با مضمون مطابقت دارد.', rolePapersTitle:'جمع‌کنندگان پارچه‌ها', rolePapersText:'پارچه‌های رسمی، پارچه‌های مراکز و برگه‌های استادان را پیدا کنند و کیفیت منبع را واضح نشان دهند.', roleTranslateTitle:'مترجمان', roleTranslateText:'محتوای مهم را به پشتو، دری و انگلیسی ساده و قابل فهم برای شاگردان ترجمه کنند.', roleGirlsTitle:'حمایت آموزش دختران', roleGirlsText:'پلان‌های خودآموز آرام، بسته‌های بنیادی و منابع خصوصی برای دختران بسازند.', roleTestTitle:'آزمایش‌کنندگان شاگرد', roleTestText:'وب‌سایت را استفاده کنند و بگویند چه چیزی گیج‌کننده، کند، نادرست یا مفید است.', pipelineEyebrow:'سیستم اعتماد', pipelineTitle:'محتوای تصادفی نباید مستقیم به شاگردان برسد.', pipelineLead:'KEP باید با برچسب منبع و روند بررسی، اعتماد سوال‌ها، کتاب‌ها و پارچه‌ها را حفظ کند.', pipeCollectTitle:'جمع‌آوری', pipeCollectText:'دریافت سوال‌ها، کتاب‌ها، یادداشت‌ها یا پارچه‌ها با جزئیات منبع.', pipeCheckTitle:'بررسی منبع', pipeCheckText:'برچسب رسمی، مبتنی بر کتاب، پارچه مرکز، شریک‌شده توسط استاد یا تاییدنشده.', pipeReviewTitle:'مرور', pipeReviewText:'یک بررسی‌کننده جواب، توضیح، زبان و سطح دشواری را چک می‌کند.', pipePublishTitle:'نشر', pipePublishText:'فقط محتوای تاییدشده با برچسب درست در KEP نشر می‌شود.', joinEyebrow:'فورم داوطلب', joinTitle:'به KEP بگو چگونه می‌توانی کمک کنی.', joinLead:'این فعلاً یک فورم نمونه در بخش ظاهری است. در نسخه اصلی می‌تواند به Google Forms، Supabase، Firebase یا داشبورد امن ادمین وصل شود.', joinPrivacy:'فعلاً اسناد خصوصی یا حساس را اینجا نفرست. این دمو فقط یک نمونه محلی در مرورگر تو ذخیره می‌کند.', formName:'نام', formContact:'تماس', formRole:'من می‌توانم کمک کنم به عنوان', formLanguage:'زبان‌ها', formMessage:'پیام', formSubmit:'ذخیره نمونه داوطلب', contribEyebrow:'مشارکت محتوا', contribTitle:'محتوا را به روش درست آماده کن.', contribLead:'هر سوال یا پارچه باید مضمون، فصل، زبان، جواب، توضیح و منبع داشته باشد. این کار پنل ادمین آینده را منظم می‌سازد.', questionChecklistTitle:'چک‌لیست سوال', paperChecklistTitle:'چک‌لیست پارچه گذشته', qc1:'مضمون و فصل', qc2:'متن سوال', qc3:'چهار گزینه جواب', qc4:'جواب درست', qc5:'توضیح کوتاه', qc6:'منبع و دشواری', pc1:'سال یا نام مرکز', pc2:'برچسب رسمی یا جمع‌آوری‌شده', pc3:'مضمون یا پارچه کامل', pc4:'زبان', pc5:'وضعیت اجازه', pc6:'نام یا یادداشت بررسی‌کننده', volunteerSaved:'نمونه داوطلب به صورت محلی ذخیره شد. نسخه اصلی آن را به تیم KEP می‌فرستد.'
  }
};

let questionBank = [
  {subject:'math',
    en:{q:'What is 12 × 8?', options:['80','88','96','108'], correct:2, explain:'12 multiplied by 8 equals 96.'},
    ps:{q:'۱۲ × ۸ څو کېږي؟', options:['۸۰','۸۸','۹۶','۱۰۸'], correct:2, explain:'۱۲ ضرب ۸ مساوي ۹۶ کېږي.'},
    fa:{q:'۱۲ × ۸ چند می‌شود؟', options:['۸۰','۸۸','۹۶','۱۰۸'], correct:2, explain:'۱۲ ضرب ۸ مساوی به ۹۶ است.'}},
  {subject:'math',
    en:{q:'If x + 5 = 12, what is x?', options:['5','6','7','8'], correct:2, explain:'Subtract 5 from both sides: x = 7.'},
    ps:{q:'که x + ۵ = ۱۲ وي، x څو دی؟', options:['۵','۶','۷','۸'], correct:2, explain:'له دواړو خواوو ۵ کم کړه: x = ۷.'},
    fa:{q:'اگر x + ۵ = ۱۲ باشد، x چند است؟', options:['۵','۶','۷','۸'], correct:2, explain:'از هر دو طرف ۵ کم می‌کنیم: x = ۷.'}},
  {subject:'math',
    en:{q:'A triangle has how many sides?', options:['2','3','4','5'], correct:1, explain:'A triangle always has three sides.'},
    ps:{q:'مثلث څو ضلعې لري؟', options:['۲','۳','۴','۵'], correct:1, explain:'مثلث تل درې ضلعې لري.'},
    fa:{q:'مثلث چند ضلع دارد؟', options:['۲','۳','۴','۵'], correct:1, explain:'مثلث همیشه سه ضلع دارد.'}},
  {subject:'biology',
    en:{q:'What is the basic unit of life?', options:['Atom','Cell','Tissue','Organ'], correct:1, explain:'The cell is the basic structural and functional unit of life.'},
    ps:{q:'د ژوند بنسټیز واحد څه دی؟', options:['اتم','حجره','نسج','غړی'], correct:1, explain:'حجره د ژوند بنسټیز جوړښتي او دندوي واحد دی.'},
    fa:{q:'واحد بنیادی زندگی چیست؟', options:['اتم','حجره','بافت','عضو'], correct:1, explain:'حجره واحد بنیادی ساختاری و وظیفوی زندگی است.'}},
  {subject:'biology',
    en:{q:'Which organ pumps blood around the body?', options:['Lungs','Brain','Heart','Stomach'], correct:2, explain:'The heart pumps blood through the body.'},
    ps:{q:'کوم غړی وینه په بدن کې پمپ کوي؟', options:['سږي','مغز','زړه','معده'], correct:2, explain:'زړه وینه په ټول بدن کې پمپ کوي.'},
    fa:{q:'کدام عضو خون را در بدن پمپ می‌کند؟', options:['شش‌ها','مغز','قلب','معده'], correct:2, explain:'قلب خون را در سراسر بدن پمپ می‌کند.'}},
  {subject:'biology',
    en:{q:'Plants make food through which process?', options:['Respiration','Photosynthesis','Digestion','Evaporation'], correct:1, explain:'Plants use photosynthesis to make food using light, water, and carbon dioxide.'},
    ps:{q:'بوټي د کومې پروسې له لارې خواړه جوړوي؟', options:['تنفس','فوتوسنتیز','هضم','تبخیر'], correct:1, explain:'بوټي د رڼا، اوبو او کاربن ډای اکساید په مرسته فوتوسنتیز کوي.'},
    fa:{q:'نباتات از طریق کدام پروسه غذا می‌سازند؟', options:['تنفس','فوتوسنتز','هضم','تبخیر'], correct:1, explain:'نباتات با نور، آب و کاربن دای اکساید فوتوسنتز انجام می‌دهند.'}},
  {subject:'english',
    en:{q:'Choose the correct sentence.', options:['She go to school.','She goes to school.','She going school.','She gone school.'], correct:1, explain:'With he/she/it in the present simple, we usually add -s to the verb.'},
    ps:{q:'سمه جمله وټاکه.', options:['She go to school.','She goes to school.','She going school.','She gone school.'], correct:1, explain:'په present simple کې د he/she/it سره عموماً فعل ته -s زیاتېږي.'},
    fa:{q:'جمله درست را انتخاب کن.', options:['She go to school.','She goes to school.','She going school.','She gone school.'], correct:1, explain:'در present simple با he/she/it معمولاً به فعل -s اضافه می‌شود.'}},
  {subject:'english',
    en:{q:'What is the opposite of “strong”?', options:['Weak','Tall','Fast','Bright'], correct:0, explain:'The opposite of strong is weak.'},
    ps:{q:'د “strong” ضد څه دی؟', options:['Weak','Tall','Fast','Bright'], correct:0, explain:'د strong ضد weak دی.'},
    fa:{q:'متضاد “strong” چیست؟', options:['Weak','Tall','Fast','Bright'], correct:0, explain:'متضاد strong کلمه weak است.'}},
  {subject:'english',
    en:{q:'Which word is a noun?', options:['Run','Beautiful','Book','Quickly'], correct:2, explain:'Book is a noun because it names a thing.'},
    ps:{q:'کومه کلمه نوم/اسم دی؟', options:['Run','Beautiful','Book','Quickly'], correct:2, explain:'Book یو اسم دی، ځکه د یو شي نوم دی.'},
    fa:{q:'کدام کلمه اسم است؟', options:['Run','Beautiful','Book','Quickly'], correct:2, explain:'Book اسم است، چون نام یک چیز را بیان می‌کند.'}},
  {subject:'general',
    en:{q:'What is the capital city of Afghanistan?', options:['Kabul','Herat','Kandahar','Mazar-i-Sharif'], correct:0, explain:'Kabul is the capital city of Afghanistan.'},
    ps:{q:'د افغانستان پلازمېنه کوم ښار دی؟', options:['کابل','هرات','کندهار','مزار شریف'], correct:0, explain:'کابل د افغانستان پلازمېنه ده.'},
    fa:{q:'پایتخت افغانستان کدام شهر است؟', options:['کابل','هرات','قندهار','مزار شریف'], correct:0, explain:'کابل پایتخت افغانستان است.'}},
  {subject:'general',
    en:{q:'How many days are there in a normal year?', options:['360','365','366','370'], correct:1, explain:'A normal year has 365 days.'},
    ps:{q:'په عادي کال کې څو ورځې وي؟', options:['۳۶۰','۳۶۵','۳۶۶','۳۷۰'], correct:1, explain:'عادي کال ۳۶۵ ورځې لري.'},
    fa:{q:'در یک سال عادی چند روز است؟', options:['۳۶۰','۳۶۵','۳۶۶','۳۷۰'], correct:1, explain:'سال عادی ۳۶۵ روز دارد.'}},
  {subject:'general',
    en:{q:'Which device is mainly used to browse websites?', options:['Spoon','Computer','Chair','Bottle'], correct:1, explain:'Computers and phones are used to browse websites.'},
    ps:{q:'د وېبپاڼو د کتلو لپاره عموماً کوم وسیله کارېږي؟', options:['کاچوغه','کمپیوټر','چوکۍ','بوتل'], correct:1, explain:'کمپیوټر او موبایل د وېبپاڼو د کتلو لپاره کارېږي.'},
    fa:{q:'برای دیدن وب‌سایت‌ها معمولاً از کدام وسیله استفاده می‌شود؟', options:['قاشق','کمپیوتر','چوکی','بوتل'], correct:1, explain:'کمپیوتر و موبایل برای مرور وب‌سایت‌ها استفاده می‌شوند.'}}
];

let currentLang = 'en';
function t(key){ return (commonTranslations[currentLang] && commonTranslations[currentLang][key]) || commonTranslations.en[key] || key; }
function setCommonNavigation(){
  const navMap = {'index.html':'navHome','kankor-info.html':'navKankor','girls-education.html':'navGirls','volunteer.html':'navVolunteer','submit-content.html':'navSubmit','review-dashboard.html':'navReview','subjects.html':'navSubjects','library.html':'navLibrary','study-packs.html':'navPacks','practice.html':'navPractice','dashboard.html':'navDashboard'};
  document.querySelectorAll('.nav-links a').forEach(a => { const key = navMap[a.getAttribute('href')]; if(key) a.textContent = t(key); });
  document.querySelectorAll('a[href="admin.html"].btn-secondary').forEach(a => a.textContent = t('navAdmin'));
  document.querySelectorAll('a[href="practice.html"].btn-primary').forEach(a => {
    if(!a.hasAttribute('data-i18n')) a.textContent = t('navStart');
  });
}
function updateEducationCounters(){
  document.querySelectorAll('.education-counter').forEach(el => {
    const start = new Date(el.getAttribute('data-counter-start') || educationStartDate);
    const now = new Date();
    const diff = Math.floor((now - start) / 86400000);
    if (Number.isFinite(diff) && diff > 0) el.textContent = diff.toLocaleString(currentLang === 'en' ? 'en-GB' : 'fa-AF');
  });
}
function applyKepLanguage(lang){
  currentLang = commonTranslations[lang] ? lang : 'en';
  const isRtl = currentLang === 'ps' || currentLang === 'fa';
  document.documentElement.lang = currentLang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', isRtl);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(t(key)) el.textContent = t(key);
  });
  document.querySelectorAll('[data-lang-button]').forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-lang-button') === currentLang));
  document.querySelectorAll('[data-i18n-scope]').forEach(scope => { scope.setAttribute('dir', isRtl ? 'rtl' : 'ltr'); scope.setAttribute('lang', currentLang); });
  setCommonNavigation();
  updateEducationCounters();
  setupQuizSubjects();
  const qLang = document.querySelector('[data-quiz-language]');
  if(qLang) qLang.value = currentLang;
  localStorage.setItem('kepLanguage', currentLang);
}

document.querySelectorAll('[data-lang-button]').forEach(btn => btn.addEventListener('click', () => applyKepLanguage(btn.getAttribute('data-lang-button'))));

const educationStartDate = '2022-03-23T00:00:00';
let activeQuiz = [];
let activeSubject = 'math';
let activeQuestionIndex = 0;
let activeScore = 0;
let activeAnswers = [];

function setupQuizSubjects(){
  const select = document.querySelector('[data-quiz-subject]');
  if(!select) return;
  const value = select.value || 'math';
  const subjects = [
    ['math', t('subjectMath')],
    ['biology', t('subjectBiology')],
    ['english', t('subjectEnglish')],
    ['general', t('subjectGeneral')]
  ];
  select.innerHTML = subjects.map(([value,label]) => `<option value="${value}">${label}</option>`).join('');
  select.value = subjects.some(s => s[0] === value) ? value : 'math';
}
function shuffle(arr){ return [...arr].sort(() => Math.random() - 0.5); }
function getLocalizedQuestion(item){ return item[currentLang] || item.en; }
function getQuestionsForSubject(subject){
  return questionBank.filter(q => normalizeSubjectSlug(q.subject) === normalizeSubjectSlug(subject));
}
function showQuizEmptyMessage(title, message){
  const empty = document.querySelector('[data-quiz-empty]');
  const live = document.querySelector('[data-quiz-live]');
  const results = document.querySelector('[data-quiz-results]');
  if(live) live.hidden = true;
  if(results) results.hidden = true;
  if(empty){
    empty.hidden = false;
    const h = empty.querySelector('h3');
    const p = empty.querySelector('p');
    if(h) h.textContent = title;
    if(p) p.textContent = message;
  }
}
function startKepQuiz(){
  const subjectSelect = document.querySelector('[data-quiz-subject]');
  const langSelect = document.querySelector('[data-quiz-language]');
  const countSelect = document.querySelector('[data-quiz-count]');
  if(!subjectSelect) return;
  if(langSelect && langSelect.value !== currentLang) applyKepLanguage(langSelect.value);
  activeSubject = subjectSelect.value;
  const count = parseInt(countSelect.value, 10) || 3;
  const pool = getQuestionsForSubject(activeSubject);
  if(!pool.length){
    showQuizEmptyMessage('No questions yet for this subject.', 'Load published questions from Google Sheets, choose another subject, or use sample questions.');
    return;
  }
  activeQuiz = shuffle(pool).slice(0, Math.min(count, pool.length));
  activeQuestionIndex = 0; activeScore = 0; activeAnswers = [];
  document.querySelector('[data-quiz-empty]').hidden = true;
  document.querySelector('[data-quiz-results]').hidden = true;
  document.querySelector('[data-quiz-live]').hidden = false;
  renderQuizQuestion();
}
function renderQuizQuestion(){
  const item = activeQuiz[activeQuestionIndex];
  const q = getLocalizedQuestion(item);
  const progressText = document.querySelector('[data-quiz-progress-text]');
  const scorePill = document.querySelector('[data-quiz-score-pill]');
  const progressBar = document.querySelector('[data-quiz-progress]');
  const questionEl = document.querySelector('[data-quiz-question]');
  const sourceEl = document.querySelector('[data-quiz-source]');
  const optionsEl = document.querySelector('[data-quiz-options]');
  const feedback = document.querySelector('[data-quiz-feedback]');
  progressText.textContent = `Question ${activeQuestionIndex + 1} of ${activeQuiz.length}`;
  scorePill.textContent = `${activeScore} ${t('correctText')}`;
  progressBar.style.width = `${(activeQuestionIndex / activeQuiz.length) * 100}%`;
  questionEl.textContent = q.q;
  if(sourceEl){
    const sourceText = item.meta?.source ? `Source: ${item.meta.source}` : (item.meta?.origin || 'KEP practice question');
    sourceEl.textContent = sourceText;
  }
  optionsEl.innerHTML = '';
  feedback.hidden = true; feedback.innerHTML = '';
  q.options.forEach((option, idx) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.type = 'button';
    button.textContent = `${String.fromCharCode(65 + idx)}. ${option}`;
    button.addEventListener('click', () => answerQuestion(idx));
    optionsEl.appendChild(button);
  });
}
function answerQuestion(selected){
  const item = activeQuiz[activeQuestionIndex];
  const q = getLocalizedQuestion(item);
  const correct = selected === q.correct;
  if(correct) activeScore++;
  activeAnswers.push({ item, selected, correct });
  document.querySelectorAll('.quiz-option').forEach((btn, idx) => {
    btn.disabled = true;
    if(idx === q.correct) btn.classList.add('correct');
    if(idx === selected && !correct) btn.classList.add('wrong');
  });
  const feedback = document.querySelector('[data-quiz-feedback]');
  feedback.hidden = false;
  const reportLink = getCorrectionFormLink(item);
  feedback.innerHTML = `<strong>${correct ? t('correctText') : t('wrongText')}</strong><p>${q.explain}</p><div class="small-actions"><button type="button" class="btn-mini" data-next-question>${t('nextQuestionText')}</button><a class="btn-mini ghost" href="${reportLink}" target="_blank" rel="noopener">Report this question</a></div>`;
  feedback.querySelector('[data-next-question]').addEventListener('click', () => {
    activeQuestionIndex++;
    if(activeQuestionIndex >= activeQuiz.length) showQuizResults();
    else renderQuizQuestion();
  });
}
function showQuizResults(){
  document.querySelector('[data-quiz-live]').hidden = true;
  const results = document.querySelector('[data-quiz-results]');
  results.hidden = false;
  const percent = Math.round((activeScore / activeQuiz.length) * 100);
  document.querySelector('[data-quiz-result-title]').textContent = percent >= 70 ? t('resultTitleGood') : t('resultTitleTry');
  document.querySelector('[data-quiz-result-summary]').textContent = t('resultSummary').replace('{score}', activeScore).replace('{total}', activeQuiz.length);
  document.querySelector('[data-final-score]').textContent = `${activeScore}/${activeQuiz.length}`;
  document.querySelector('[data-final-percent]').textContent = `${percent}%`;
  document.querySelector('[data-final-subject]').textContent = subjectLabel(activeSubject);
  const insight = document.querySelector('[data-result-insight]');
  if(insight){
    const weakCount = activeAnswers.filter(a => !a.correct).length;
    const level = percent >= 80 ? 'Excellent' : percent >= 60 ? 'Good progress' : 'Needs revision';
    const next = weakCount ? `Review the ${weakCount} wrong answer${weakCount === 1 ? '' : 's'}, then try a shorter quiz again.` : 'Strong work. Try a timed mock exam next.';
    insight.innerHTML = `<strong>${level}</strong><span>${next}</span>`;
  }
  const review = document.querySelector('[data-answer-review]');
  review.innerHTML = activeAnswers.map((entry, idx) => {
    const q = getLocalizedQuestion(entry.item);
    const reportLink = getCorrectionFormLink(entry.item);
    return `<div class="review-item ${entry.correct ? 'ok' : 'fix'}"><strong>${idx+1}. ${q.q}</strong><p>${t('yourAnswerText')}: ${q.options[entry.selected] || '-'}</p><p>${t('correctAnswerText')}: ${q.options[q.correct]}</p><p>${t('explanationText')}: ${q.explain}</p><div class="small-actions"><a class="btn-mini ghost" href="${reportLink}" target="_blank" rel="noopener">Report issue</a></div></div>`;
  }).join('');
  const wrongBtn = document.querySelector('[data-practice-wrong-answers]');
  if(wrongBtn) wrongBtn.hidden = !activeAnswers.some(a => !a.correct);
  const bar = document.querySelector('[data-quiz-progress]');
  if(bar) bar.style.width = '100%';
  saveKepPracticeAttempt({
    subject: activeSubject,
    language: currentLang,
    score: activeScore,
    total: activeQuiz.length,
    answers: activeAnswers
  });
}

document.querySelector('[data-start-quiz]')?.addEventListener('click', startKepQuiz);
document.querySelector('[data-restart-quiz]')?.addEventListener('click', startKepQuiz);
document.querySelector('[data-quiz-language]')?.addEventListener('change', e => applyKepLanguage(e.target.value));

const adminForm = document.querySelector('[data-admin-form]');
if(adminForm){
  adminForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const out = document.querySelector('[data-admin-output]');
    const data = Object.fromEntries(new FormData(adminForm).entries());
    out.style.display = 'block';
    out.textContent = `Saved as sample data: ${data.subject} / ${data.chapter} / ${data.difficulty}. In the real version this will save to Supabase or Firebase.`;
    adminForm.reset();
  });
}


const volunteerForm = document.querySelector('[data-volunteer-form]');
if(volunteerForm){
  volunteerForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(volunteerForm).entries());
    const saved = JSON.parse(localStorage.getItem('kepVolunteerSamples') || '[]');
    saved.push({...data, savedAt:new Date().toISOString()});
    localStorage.setItem('kepVolunteerSamples', JSON.stringify(saved));
    const out = document.querySelector('[data-volunteer-output]');
    if(out){ out.style.display = 'block'; out.textContent = t('volunteerSaved'); }
    volunteerForm.reset();
  });
}

applyKepLanguage(localStorage.getItem('kepLanguage') || 'en');

if('serviceWorker' in navigator){
  window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js').catch(()=>{}));
}


const contentForms = document.querySelectorAll('[data-content-form]');
contentForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = form.getAttribute('data-form-type') || 'Content';
    const data = Object.fromEntries(new FormData(form).entries());
    const saved = JSON.parse(localStorage.getItem('kepContentSamples') || '[]');
    saved.push({type, ...data, status:'Collected', savedAt:new Date().toISOString()});
    localStorage.setItem('kepContentSamples', JSON.stringify(saved));
    const out = form.querySelector('[data-form-output]');
    if(out){ out.style.display = 'block'; out.textContent = t('contentSaved'); }
    form.reset();
  });
});

document.querySelector('[data-export-samples]')?.addEventListener('click', () => {
  const saved = JSON.parse(localStorage.getItem('kepContentSamples') || '[]');
  const out = document.querySelector('[data-export-output]');
  if(out){ out.hidden = false; out.textContent = JSON.stringify(saved, null, 2); }
});
document.querySelector('[data-clear-samples]')?.addEventListener('click', () => {
  localStorage.removeItem('kepContentSamples');
  const out = document.querySelector('[data-export-output]');
  if(out){ out.hidden = false; out.textContent = t('contentCleared'); }
});


// KEP v3.1 review dashboard: live Google Sheet summaries + save review status back to Sheets
let liveReviewItems = JSON.parse(localStorage.getItem('kepLiveReviewItems') || '[]');
const reviewSeedItems = [
  {id:'Q-001', type:'Question', title:'Biology: basic unit of life', source:'Textbook-based sample', language:'English / Pashto / Dari', status:'Academic Review', checks:['Question clear','Correct answer checked','Explanation needed','Translation pending']},
  {id:'P-001', type:'Past Paper', title:'Collected Kankor practice paper', source:'Centre practice / unverified', language:'Dari', status:'Source Check', checks:['Year needed','Owner/permission needed','Label as centre practice']},
  {id:'B-001', type:'Book', title:'Grade 12 Mathematics notes', source:'Volunteer suggested PDF', language:'Pashto', status:'Collected', checks:['Copyright status needed','File readability needed','Subject label needed']},
  {id:'C-001', type:'Correction', title:'Report: unclear English explanation', source:'Student feedback', language:'English', status:'Translation Review', checks:['Find original question','Check explanation','Update wording']},
  {id:'V-001', type:'Volunteer', title:'Teacher reviewer application', source:'Volunteer form', language:'Pashto / Dari', status:'Ready to Publish', checks:['Contact verified','Subject strength noted','Role assigned']}
];
const reviewStatuses = ['Collected','Source Check','Academic Review','Translation Review','Ready to Publish','Published','Rejected'];
function getReviewItems(){
  const demoContent = JSON.parse(localStorage.getItem('kepContentSamples') || '[]').map((item, idx) => ({
    id:`LOCAL-${idx+1}`,
    type:item.type || 'Content',
    title:item.question || item.title || item.message || `${item.type || 'Content'} submission`,
    source:item.source || item.paper_type || item.copyright || 'Local demo submission',
    language:item.language || 'Not specified',
    status:item.status || 'Collected',
    checks:['Source label needed','Reviewer note needed','Publish decision needed']
  }));
  const stored = JSON.parse(localStorage.getItem('kepReviewStatuses') || '{}');
  return [...reviewSeedItems, ...demoContent, ...liveReviewItems].map(item => ({...item, status: stored[item.id] || item.status}));
}
function escapeHtml(value){
  return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}
function renderReviewDashboard(filter='All'){
  const list = document.querySelector('[data-review-list]');
  if(!list) return;
  const statsEl = document.querySelector('[data-review-stats]');
  const items = getReviewItems();
  const filtered = filter === 'All' ? items : items.filter(i => i.status === filter);
  const counts = reviewStatuses.reduce((acc,s)=>{ acc[s]=items.filter(i=>i.status===s).length; return acc; },{});
  if(statsEl){
    statsEl.innerHTML = [
      ['Total', items.length], ['Collected', counts['Collected']], ['In review', counts['Source Check']+counts['Academic Review']+counts['Translation Review']], ['Ready', counts['Ready to Publish']], ['Published', counts['Published']]
    ].map(([label,value]) => `<div class="metric"><strong>${value}</strong><span>${label}</span></div>`).join('');
  }
  list.innerHTML = filtered.map(item => {
    const canSave = Boolean(item.canSave && item.sheetName && item.rowNumber);
    return `
    <article class="review-card" data-review-id="${escapeHtml(item.id)}" ${canSave ? `data-live-sheet="${escapeHtml(item.sheetName)}" data-live-row="${escapeHtml(item.rowNumber)}"` : ''}>
      <div class="review-card-top"><span class="review-id">${escapeHtml(item.id)}</span><span class="tag ${item.status === 'Published' ? 'green' : item.status === 'Rejected' ? 'red' : 'gold'}">${escapeHtml(item.status)}</span></div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.type)} • ${escapeHtml(item.language)}</p>
      <div class="review-source"><b>Source:</b> ${escapeHtml(item.source)}</div>
      ${item.origin ? `<div class="review-origin">${escapeHtml(item.origin)}</div>` : ''}
      ${item.reviewedBy || item.reviewedAt ? `<div class="review-meta"><b>Last review:</b> ${escapeHtml(item.reviewedBy || 'Reviewer')} ${item.reviewedAt ? '• ' + escapeHtml(item.reviewedAt) : ''}</div>` : ''}
      ${item.reviewerNotes ? `<div class="review-note-display"><b>Reviewer note:</b> ${escapeHtml(item.reviewerNotes)}</div>` : ''}
      <ul>${(item.checks || []).map(c => `<li>${escapeHtml(c)}</li>`).join('')}</ul>
      <label class="review-status-label">Move status<select data-review-status>${reviewStatuses.map(s => `<option>${escapeHtml(s)}</option>`).join('')}</select></label>
      ${canSave ? `<label class="review-status-label review-note-label">Reviewer notes<textarea data-review-notes placeholder="Example: Correct answer checked, source needs page number...">${escapeHtml(item.reviewerNotes || '')}</textarea></label><div class="small-actions"><button class="btn btn-primary" type="button" data-save-review-sheet>Save to Google Sheet</button></div><p class="small" data-save-review-status></p>` : `<p class="small demo-save-note">Demo/local items save only in this browser.</p>`}
    </article>`;
  }).join('') || '<div class="card"><h3>No items in this filter yet.</h3><p class="small">Try another filter or submit demo content from the Submit Content page.</p></div>';
  list.querySelectorAll('[data-review-status]').forEach(select => {
    const card = select.closest('[data-review-id]');
    const item = filtered.find(i => i.id === card.getAttribute('data-review-id'));
    select.value = item.status;
    select.addEventListener('change', () => {
      const stored = JSON.parse(localStorage.getItem('kepReviewStatuses') || '{}');
      stored[item.id] = select.value;
      localStorage.setItem('kepReviewStatuses', JSON.stringify(stored));
      if(!card.hasAttribute('data-live-sheet')){
        renderReviewDashboard(document.querySelector('[data-filter-review].active')?.getAttribute('data-filter-review') || 'All');
      }
    });
  });
  list.querySelectorAll('[data-save-review-sheet]').forEach(button => {
    button.addEventListener('click', () => saveReviewStatusToSheet(button.closest('[data-review-id]')));
  });
}

function setLiveApiStatus(message, ok=false){
  const el = document.querySelector('[data-live-api-status]');
  if(el){ el.textContent = message; el.classList.toggle('ok', ok); }
}
function setRowSaveStatus(card, message, ok=false){
  const el = card?.querySelector('[data-save-review-status]');
  if(el){ el.textContent = message; el.classList.toggle('ok', ok); }
}
function loadSavedLiveApiUrl(){
  const input = document.querySelector('[data-live-api-url]');
  if(!input) return;
  input.value = localStorage.getItem('kepLiveApiUrl') || '';
  const reviewer = document.querySelector('[data-reviewer-name]');
  if(reviewer) reviewer.value = localStorage.getItem('kepReviewerName') || '';
  const key = document.querySelector('[data-review-access-key]');
  if(key) key.value = localStorage.getItem('kepReviewAccessKey') || '';
  if(input.value) setLiveApiStatus('Saved connection found. Click “Load live submissions”.', true);
}
function jsonpRequest(apiUrl, params){
  return new Promise((resolve, reject) => {
    if(!apiUrl) { reject(new Error('Paste the Apps Script Web App URL first.')); return; }
    const callbackName = 'kepLiveCallback_' + Date.now() + '_' + Math.floor(Math.random()*10000);
    const script = document.createElement('script');
    const separator = apiUrl.includes('?') ? '&' : '?';
    const query = new URLSearchParams({...params, callback: callbackName}).toString();
    let timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error('Google Apps Script did not respond. Check deployment access.'));
    }, 25000);
    window[callbackName] = (payload) => {
      cleanup();
      if(payload && payload.ok) resolve(payload);
      else reject(new Error((payload && payload.error) || 'The API did not return valid data.'));
    };
    function cleanup(){
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }
    script.onerror = () => { cleanup(); reject(new Error('Could not load the Google Apps Script API. Check deployment access.')); };
    script.src = apiUrl + separator + query;
    document.body.appendChild(script);
  });
}
async function fetchLiveReviewItems(apiUrl){
  const payload = await jsonpRequest(apiUrl, {action:'review'});
  return payload.items || [];
}
async function loadLiveReviewDashboard(){
  const input = document.querySelector('[data-live-api-url]');
  const apiUrl = input ? input.value.trim() : '';
  try{
    setLiveApiStatus('Loading live submissions...');
    const items = await fetchLiveReviewItems(apiUrl);
    liveReviewItems = items.map((item, idx) => ({
      id: item.id || `LIVE-${idx+1}`,
      type: item.type || 'Content',
      title: item.title || 'Untitled submission',
      source: item.source || 'Google Sheet',
      language: item.language || 'Not specified',
      status: item.status || 'Collected',
      checks: item.checks || ['Source label needed','Reviewer note needed','Publish decision needed'],
      origin: item.origin || 'Live Google Sheet summary',
      reviewerNotes: item.reviewerNotes || '',
      reviewedBy: item.reviewedBy || '',
      reviewedAt: item.reviewedAt || '',
      sheetName: item.sheetName || '',
      rowNumber: item.rowNumber || '',
      canSave: Boolean(item.canSave)
    }));
    localStorage.setItem('kepLiveReviewItems', JSON.stringify(liveReviewItems));
    localStorage.setItem('kepLiveApiUrl', apiUrl);
    const reviewer = document.querySelector('[data-reviewer-name]')?.value.trim() || '';
    const key = document.querySelector('[data-review-access-key]')?.value.trim() || '';
    if(reviewer) localStorage.setItem('kepReviewerName', reviewer);
    if(key) localStorage.setItem('kepReviewAccessKey', key);
    localStorage.removeItem('kepReviewStatuses');
    renderReviewDashboard(document.querySelector('[data-filter-review].active')?.getAttribute('data-filter-review') || 'All');
    setLiveApiStatus(`Loaded ${liveReviewItems.length} live submissions from Google Sheets.`, true);
  } catch(err){
    setLiveApiStatus(err.message || 'Could not load live submissions.');
  }
}
async function saveReviewStatusToSheet(card){
  if(!card) return;
  const apiUrl = document.querySelector('[data-live-api-url]')?.value.trim() || localStorage.getItem('kepLiveApiUrl') || '';
  const sheetName = card.getAttribute('data-live-sheet');
  const rowNumber = card.getAttribute('data-live-row');
  const id = card.getAttribute('data-review-id');
  const status = card.querySelector('[data-review-status]')?.value || 'Collected';
  const reviewerNotes = card.querySelector('[data-review-notes]')?.value || '';
  const reviewedBy = document.querySelector('[data-reviewer-name]')?.value.trim() || localStorage.getItem('kepReviewerName') || '';
  const reviewKey = document.querySelector('[data-review-access-key]')?.value.trim() || localStorage.getItem('kepReviewAccessKey') || '';
  try{
    setRowSaveStatus(card, 'Saving to Google Sheet...');
    const payload = await jsonpRequest(apiUrl, {action:'update', sheetName, rowNumber, status, reviewerNotes, reviewedBy, reviewKey});
    const itemUpdate = payload.item || {};
    liveReviewItems = liveReviewItems.map(item => item.id === id ? {...item, status, reviewerNotes, reviewedBy:itemUpdate.reviewedBy || reviewedBy, reviewedAt:itemUpdate.reviewedAt || new Date().toISOString()} : item);
    localStorage.setItem('kepLiveReviewItems', JSON.stringify(liveReviewItems));
    const stored = JSON.parse(localStorage.getItem('kepReviewStatuses') || '{}');
    stored[id] = status;
    localStorage.setItem('kepReviewStatuses', JSON.stringify(stored));
    if(reviewedBy) localStorage.setItem('kepReviewerName', reviewedBy);
    if(reviewKey) localStorage.setItem('kepReviewAccessKey', reviewKey);
    setRowSaveStatus(card, 'Saved to Google Sheet.', true);
    renderReviewDashboard(document.querySelector('[data-filter-review].active')?.getAttribute('data-filter-review') || 'All');
  } catch(err){
    setRowSaveStatus(card, err.message || 'Could not save to Google Sheet.');
  }
}
document.querySelector('[data-save-live-api]')?.addEventListener('click', () => {
  const input = document.querySelector('[data-live-api-url]');
  const apiUrl = input ? input.value.trim() : '';
  if(!apiUrl){ setLiveApiStatus('Paste your Apps Script Web App URL first.'); return; }
  localStorage.setItem('kepLiveApiUrl', apiUrl);
  const reviewer = document.querySelector('[data-reviewer-name]')?.value.trim() || '';
  const key = document.querySelector('[data-review-access-key]')?.value.trim() || '';
  if(reviewer) localStorage.setItem('kepReviewerName', reviewer);
  if(key) localStorage.setItem('kepReviewAccessKey', key);
  setLiveApiStatus('Saved in this browser. Now click “Load live submissions”.', true);
});
document.querySelector('[data-load-live-review]')?.addEventListener('click', loadLiveReviewDashboard);
document.querySelector('[data-clear-live-api]')?.addEventListener('click', () => {
  localStorage.removeItem('kepLiveApiUrl');
  localStorage.removeItem('kepLiveReviewItems');
  localStorage.removeItem('kepReviewAccessKey');
  liveReviewItems = [];
  const input = document.querySelector('[data-live-api-url]');
  if(input) input.value = '';
  const key = document.querySelector('[data-review-access-key]');
  if(key) key.value = '';
  renderReviewDashboard('All');
  setLiveApiStatus('Connection cleared.');
});
loadSavedLiveApiUrl();

document.querySelectorAll('[data-filter-review]').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('[data-filter-review]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderReviewDashboard(btn.getAttribute('data-filter-review'));
}));
document.querySelector('[data-reset-review]')?.addEventListener('click', () => { localStorage.removeItem('kepReviewStatuses'); renderReviewDashboard('All'); });
renderReviewDashboard('All');


// KEP v3.2: Load published questions from Google Sheets into Practice MCQs
const sampleQuestionBank = JSON.parse(JSON.stringify(questionBank));
function normalizeSubjectSlug(value){
  const raw = String(value || '').trim().toLowerCase();
  if(!raw) return 'general';
  if(raw.includes('math') || raw.includes('ریاضی') || raw.includes('حساب')) return 'math';
  if(raw.includes('bio') || raw.includes('biology') || raw.includes('ژوند') || raw.includes('حیات')) return 'biology';
  if(raw.includes('english') || raw.includes('انگلیسي') || raw.includes('انگلیسی')) return 'english';
  if(raw.includes('general') || raw.includes('عمومي') || raw.includes('عمومی')) return 'general';
  if(raw.includes('chem') || raw.includes('کیمیا')) return 'chemistry';
  if(raw.includes('phys') || raw.includes('فزیک') || raw.includes('فزیک')) return 'physics';
  return raw.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'general';
}
function subjectLabel(value){
  const slug = normalizeSubjectSlug(value);
  const known = {math:t('subjectMath'), biology:t('subjectBiology'), english:t('subjectEnglish'), general:t('subjectGeneral'), chemistry:'Chemistry', physics:'Physics'};
  if(known[slug]) return known[slug];
  return String(value || slug).replace(/[-_]+/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
}
const KEP_CORRECTION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeULMyJ4VCKLZL6ejUiaspdyJUGTHiHIPWVVx1SuF6PYI3pvA/viewform';
function getCorrectionFormLink(item){
  const id = encodeURIComponent(item?.id || 'unknown');
  return `${KEP_CORRECTION_FORM_URL}?usp=pp_url&entry.000000000=${id}`;
}
function updateQuestionBankSummary(){
  const summary = document.querySelector('[data-question-bank-summary]');
  const mini = document.querySelector('[data-quiz-bank-mini]');
  if(!summary && !mini) return;
  const total = questionBank.length;
  const published = questionBank.filter(q => q.meta?.origin && String(q.meta.origin).includes('Google')).length;
  const sample = total - published;
  const subjects = Array.from(new Set(questionBank.map(q => normalizeSubjectSlug(q.subject)))).map(subjectLabel).join(', ');
  if(summary){
    summary.innerHTML = `<b>${total}</b> questions available • <b>${published}</b> published • <b>${sample}</b> samples<br><span>${subjects || 'No subjects yet'}</span>`;
  }
  const subjectSelect = document.querySelector('[data-quiz-subject]');
  if(mini && subjectSelect){
    const subject = subjectSelect.value || 'math';
    const count = getQuestionsForSubject(subject).length;
    mini.textContent = `${count} question${count === 1 ? '' : 's'} available for ${subjectLabel(subject)}.`;
  }
}
function updateQuizCountOptions(){
  const countSelect = document.querySelector('[data-quiz-count]');
  const subjectSelect = document.querySelector('[data-quiz-subject]');
  if(!countSelect || !subjectSelect) return;
  const available = Math.max(1, getQuestionsForSubject(subjectSelect.value).length);
  const current = parseInt(countSelect.value, 10) || 3;
  const choices = [1,3,5,10,20].filter(n => n <= available);
  if(!choices.includes(available) && available < 20) choices.push(available);
  const unique = [...new Set(choices)].sort((a,b)=>a-b);
  countSelect.innerHTML = unique.map(n => `<option value="${n}">${n}</option>`).join('');
  countSelect.value = unique.includes(current) ? current : String(unique[Math.min(1, unique.length-1)] || 1);
}
function refreshQuizSubjectOptions(){
  const select = document.querySelector('[data-quiz-subject]');
  if(!select) return;
  const currentValue = select.value || 'math';
  const unique = [];
  questionBank.forEach(q => {
    const slug = normalizeSubjectSlug(q.subject);
    if(!unique.some(u => u.slug === slug)) unique.push({slug, label: subjectLabel(q.subject)});
  });
  const order = ['math','biology','chemistry','physics','english','general'];
  unique.sort((a,b) => (order.indexOf(a.slug) === -1 ? 999 : order.indexOf(a.slug)) - (order.indexOf(b.slug) === -1 ? 999 : order.indexOf(b.slug)) || a.label.localeCompare(b.label));
  select.innerHTML = unique.map(s => `<option value="${escapeHtml(s.slug)}">${escapeHtml(s.label)}</option>`).join('');
  select.value = unique.some(s => s.slug === currentValue) ? currentValue : (unique[0]?.slug || 'math');
  updateQuizCountOptions();
  updateQuestionBankSummary();
}
const originalSetupQuizSubjects = setupQuizSubjects;
setupQuizSubjects = function(){ refreshQuizSubjectOptions(); };
function getQuestionField(row, keys){
  for(const key of keys){
    if(row && row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '') return row[key];
  }
  return '';
}
function resolveCorrectIndex(raw, options){
  const value = String(raw ?? '').trim();
  const number = Number(value);
  if(Number.isFinite(number) && options[number] !== undefined) return number;
  const letterIndex = {A:0,B:1,C:2,D:3}[value.toUpperCase()];
  if(letterIndex !== undefined && options[letterIndex] !== undefined) return letterIndex;
  const exact = options.findIndex(opt => String(opt).trim().toLowerCase() === value.toLowerCase());
  return exact >= 0 ? exact : 0;
}
function convertPublishedQuestion(item){
  const rawSubject = getQuestionField(item, ['subject','subject_name','subjectName','subjectSlug','Subject']) || 'General';
  const slug = normalizeSubjectSlug(rawSubject);
  const language = (item.language || 'en').toLowerCase().includes('pashto') || item.language === 'ps' ? 'ps' : ((item.language || '').toLowerCase().includes('dari') || item.language === 'fa' ? 'fa' : 'en');
  const options = Array.isArray(item.options) ? item.options : [
    getQuestionField(item, ['optionA','option_a','Option A','A']),
    getQuestionField(item, ['optionB','option_b','Option B','B']),
    getQuestionField(item, ['optionC','option_c','Option C','C']),
    getQuestionField(item, ['optionD','option_d','Option D','D'])
  ].filter(Boolean);
  const rawCorrect = getQuestionField(item, ['correct','correctAnswer','correct_answer','answer','Answer','Correct Answer']);
  const q = {
    q: getQuestionField(item, ['q','question','questionText','question_text','Question','Question Text']),
    options,
    correct: resolveCorrectIndex(rawCorrect, options),
    explain: getQuestionField(item, ['explain','explanation','Explanation']) || 'Explanation will be added after review.'
  };
  if(!q.q || q.options.length < 2) return null;
  const base = {subject: slug, id: item.id || `published-${Date.now()}-${Math.random()}`, meta:{source:item.source || item.sourceLabel || 'Published from Google Sheets', origin:item.origin || 'Live Google Sheet', language:item.language || language}};
  base.en = q; base.ps = q; base.fa = q;
  base[language] = q;
  return base;
}
async function loadPublishedQuestionsForPractice(){
  const input = document.querySelector('[data-practice-live-api-url]');
  const status = document.querySelector('[data-published-api-status]');
  const apiUrl = input?.value.trim() || localStorage.getItem('kepLiveApiUrl') || '';
  if(!apiUrl){ if(status){ status.textContent = 'Paste the Apps Script Web App URL first.'; status.className = 'small warn'; } return; }
  try{
    if(status){ status.textContent = 'Loading published questions...'; status.className = 'small'; }
    const payload = await jsonpRequest(apiUrl, {action:'publishedQuestions'});
    const liveQuestions = (payload.questions || []).map(convertPublishedQuestion).filter(q => q && q.en && q.en.options && q.en.options.length >= 2);
    if(!liveQuestions.length){
      questionBank = [...sampleQuestionBank];
      refreshQuizSubjectOptions();
      if(status){ status.textContent = 'No published questions found yet. Mark at least one question as Published in the Review Dashboard.'; status.className = 'small warn'; }
      return;
    }
    questionBank = [...liveQuestions, ...sampleQuestionBank];
    localStorage.setItem('kepPracticeApiUrl', apiUrl);
    localStorage.setItem('kepPublishedQuestionsCache', JSON.stringify(liveQuestions));
    refreshQuizSubjectOptions();
    if(status){ status.textContent = `Loaded ${liveQuestions.length} published question${liveQuestions.length === 1 ? '' : 's'} from Google Sheets.`; status.className = 'small ok'; }
  }catch(err){
    if(status){ status.textContent = err.message || 'Could not load published questions.'; status.className = 'small warn'; }
  }
}
function loadPracticeApiUrl(){
  const input = document.querySelector('[data-practice-live-api-url]');
  if(!input) return;
  input.value = localStorage.getItem('kepPracticeApiUrl') || localStorage.getItem('kepLiveApiUrl') || '';
  const cached = JSON.parse(localStorage.getItem('kepPublishedQuestionsCache') || '[]');
  if(cached.length){
    questionBank = [...cached, ...sampleQuestionBank];
    refreshQuizSubjectOptions();
    const status = document.querySelector('[data-published-api-status]');
    if(status){ status.textContent = `Using ${cached.length} cached published question${cached.length === 1 ? '' : 's'}. Click “Load published questions” to refresh.`; status.className = 'small ok'; }
  }
}
document.querySelector('[data-load-published-questions]')?.addEventListener('click', loadPublishedQuestionsForPractice);
document.querySelector('[data-save-practice-api]')?.addEventListener('click', () => {
  const input = document.querySelector('[data-practice-live-api-url]');
  const status = document.querySelector('[data-published-api-status]');
  const apiUrl = input?.value.trim() || '';
  if(!apiUrl){ if(status){ status.textContent = 'Paste the Apps Script Web App URL first.'; status.className = 'small warn'; } return; }
  localStorage.setItem('kepPracticeApiUrl', apiUrl);
  localStorage.setItem('kepLiveApiUrl', apiUrl);
  if(status){ status.textContent = 'Saved in this browser. Now click “Load published questions”.'; status.className = 'small ok'; }
});
document.querySelector('[data-use-sample-questions]')?.addEventListener('click', () => {
  questionBank = [...sampleQuestionBank];
  localStorage.removeItem('kepPublishedQuestionsCache');
  refreshQuizSubjectOptions();
  const status = document.querySelector('[data-published-api-status]');
  if(status){ status.textContent = 'Sample questions are loaded.'; status.className = 'small'; }
});
document.querySelector('[data-quiz-subject]')?.addEventListener('change', () => {
  updateQuizCountOptions();
  updateQuestionBankSummary();
});
document.querySelector('[data-practice-wrong-answers]')?.addEventListener('click', () => {
  const wrong = activeAnswers.filter(a => !a.correct).map(a => a.item);
  if(!wrong.length) return;
  activeQuiz = wrong;
  activeQuestionIndex = 0;
  activeScore = 0;
  activeAnswers = [];
  document.querySelector('[data-quiz-results]').hidden = true;
  document.querySelector('[data-quiz-empty]').hidden = true;
  document.querySelector('[data-quiz-live]').hidden = false;
  renderQuizQuestion();
});
loadPracticeApiUrl();
refreshQuizSubjectOptions();
updateQuestionBankSummary();


// KEP v3.4: Student Dashboard progress tracking (local-first MVP)
function getKepPracticeAttempts(){
  try { return JSON.parse(localStorage.getItem('kepPracticeAttempts') || '[]'); } catch(e){ return []; }
}
function saveKepPracticeAttempt(attempt){
  if(!attempt || !attempt.total) return;
  const attempts = getKepPracticeAttempts();
  const percent = Math.round((Number(attempt.score || 0) / Number(attempt.total || 1)) * 100);
  const simplifiedAnswers = (attempt.answers || []).map(entry => {
    const q = getLocalizedQuestion(entry.item || {});
    return {
      subject: normalizeSubjectSlug((entry.item || {}).subject || attempt.subject),
      question: q?.q || 'Question',
      correct: Boolean(entry.correct),
      selected: entry.selected,
      source: (entry.item || {}).meta?.source || 'KEP question'
    };
  });
  attempts.unshift({
    id: 'ATT-' + Date.now(),
    createdAt: new Date().toISOString(),
    subject: normalizeSubjectSlug(attempt.subject),
    subjectLabel: subjectLabel(attempt.subject),
    language: attempt.language || currentLang || 'en',
    score: Number(attempt.score || 0),
    total: Number(attempt.total || 0),
    percent,
    wrong: simplifiedAnswers.filter(a => !a.correct).length,
    answers: simplifiedAnswers
  });
  localStorage.setItem('kepPracticeAttempts', JSON.stringify(attempts.slice(0, 80)));
}
function formatAttemptDate(iso){
  try { return new Date(iso).toLocaleString(currentLang === 'en' ? 'en-GB' : 'fa-AF', {day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'}); }
  catch(e){ return iso || ''; }
}
function calculateKepStudyStreak(attempts){
  const days = [...new Set(attempts.map(a => (a.createdAt || '').slice(0,10)).filter(Boolean))].sort().reverse();
  if(!days.length) return 0;
  let streak = 0;
  const cursor = new Date();
  for(let i=0;i<60;i++){
    const key = cursor.toISOString().slice(0,10);
    if(days.includes(key)) streak++;
    else if(streak > 0) break;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
function getSubjectStats(attempts){
  const map = {};
  attempts.forEach(a => {
    const key = normalizeSubjectSlug(a.subject);
    if(!map[key]) map[key] = {subject:key, label:subjectLabel(key), attempts:0, totalPercent:0, latest:null, wrong:0};
    map[key].attempts += 1;
    map[key].totalPercent += Number(a.percent || 0);
    map[key].wrong += Number(a.wrong || 0);
    if(!map[key].latest || new Date(a.createdAt) > new Date(map[key].latest.createdAt)) map[key].latest = a;
  });
  return Object.values(map).map(s => ({...s, avg: Math.round(s.totalPercent / Math.max(1, s.attempts))})).sort((a,b)=>b.attempts-a.attempts || a.avg-b.avg);
}
function getDreamFieldPlan(field){
  const plans = {
    medicine: {label:'Medicine', focus:['Biology','Chemistry','Physics'], task:'Review Biology basics, then practise 15 mixed science MCQs.'},
    engineering: {label:'Engineering', focus:['Mathematics','Physics'], task:'Practise problem-solving questions and review formulas.'},
    computer_science: {label:'Computer Science', focus:['Mathematics','English','Logic'], task:'Focus on Mathematics accuracy and English vocabulary.'},
    law: {label:'Law', focus:['Language','Islamic Studies','History'], task:'Practise language comprehension and general knowledge.'},
    education: {label:'Education', focus:['Foundation subjects','Language'], task:'Build steady basics and review wrong answers daily.'},
    general: {label:'General Kankor', focus:['Mathematics','Science','Languages'], task:'Take one short quiz, then review every wrong answer.'}
  };
  return plans[field] || plans.general;
}
function setDashboardText(selector, value){ const el = document.querySelector(selector); if(el) el.textContent = value; }
function renderKepStudentDashboard(){
  const root = document.querySelector('[data-student-dashboard-v34], [data-student-dashboard-v35]');
  if(!root) return;
  const attempts = getKepPracticeAttempts();
  const stats = getSubjectStats(attempts);
  const latest = attempts[0];
  const avg = attempts.length ? Math.round(attempts.reduce((sum,a)=>sum+Number(a.percent||0),0)/attempts.length) : 0;
  const best = stats.length ? [...stats].sort((a,b)=>b.avg-a.avg)[0] : null;
  const weak = stats.length ? [...stats].sort((a,b)=>a.avg-b.avg || b.wrong-a.wrong)[0] : null;
  const streak = calculateKepStudyStreak(attempts);
  const fieldSelect = document.querySelector('[data-dashboard-field]');
  const savedField = localStorage.getItem('kepDreamField') || 'computer_science';
  if(fieldSelect) fieldSelect.value = savedField;
  const plan = getDreamFieldPlan(savedField);

  setDashboardText('[data-dash-streak]', String(streak));
  setDashboardText('[data-dash-last-score]', latest ? `${latest.score}/${latest.total}` : '—');
  setDashboardText('[data-dash-average]', attempts.length ? `${avg}%` : '0%');
  setDashboardText('[data-dash-weak]', weak ? weak.label : 'Start quiz');
  setDashboardText('[data-dash-field]', plan.label);
  setDashboardText('[data-dash-total-attempts]', String(attempts.length));
  setDashboardText('[data-dashboard-plan-title]', `Today’s focus: ${weak ? weak.label : plan.focus[0]}`);
  setDashboardText('[data-dashboard-plan-text]', weak ? `Your lowest average is ${weak.avg}% in ${weak.label}. Review mistakes, then practise a short quiz again.` : plan.task);
  setDashboardText('[data-dashboard-field-focus]', plan.focus.join(' • '));
  setDashboardText('[data-dashboard-best-subject]', best ? `${best.label} (${best.avg}%)` : 'No subject yet');

  const subjectList = document.querySelector('[data-dashboard-subject-progress]');
  if(subjectList){
    subjectList.innerHTML = stats.length ? stats.map(s => `
      <div class="score-card dashboard-score-card">
        <div class="score-card-line"><span>${escapeHtml(s.label)}</span><b>${s.avg}%</b></div>
        <div class="progress"><span style="width:${Math.max(4, Math.min(100, s.avg))}%"></span></div>
        <p class="small">${s.attempts} attempt${s.attempts === 1 ? '' : 's'} • ${s.wrong} wrong answer${s.wrong === 1 ? '' : 's'} to review</p>
      </div>`).join('') : `<div class="empty-state-soft"><b>No progress yet.</b><span>Complete your first quiz and this dashboard will become personal.</span></div>`;
  }

  const recentList = document.querySelector('[data-dashboard-recent-attempts]');
  if(recentList){
    recentList.innerHTML = attempts.length ? attempts.slice(0,6).map(a => `
      <div class="attempt-row">
        <div><b>${escapeHtml(a.subjectLabel || subjectLabel(a.subject))}</b><span>${formatAttemptDate(a.createdAt)} • ${escapeHtml((a.language || 'en').toUpperCase())}</span></div>
        <strong>${a.score}/${a.total} <small>${a.percent}%</small></strong>
      </div>`).join('') : `<div class="empty-state-soft"><b>No attempts yet.</b><span>Start with 3 questions in Practice MCQs.</span></div>`;
  }

  const wrongList = document.querySelector('[data-dashboard-wrong-areas]');
  if(wrongList){
    const wrongAnswers = attempts.flatMap(a => (a.answers || []).filter(x => !x.correct).map(x => ({...x, createdAt:a.createdAt, subjectLabel:a.subjectLabel})) ).slice(0,6);
    wrongList.innerHTML = wrongAnswers.length ? wrongAnswers.map(w => `
      <div class="wrong-row"><span>${escapeHtml(w.subjectLabel || subjectLabel(w.subject))}</span><b>${escapeHtml(w.question)}</b></div>`).join('') : `<div class="empty-state-soft"><b>No wrong answers saved.</b><span>That means either strong work, or you need to take your first quiz.</span></div>`;
  }
}

document.querySelector('[data-save-dream-field]')?.addEventListener('click', () => {
  const field = document.querySelector('[data-dashboard-field]')?.value || 'general';
  localStorage.setItem('kepDreamField', field);
  const profile = getKepStudentProfile ? getKepStudentProfile() : {};
  if(profile && Object.keys(profile).length){ saveKepStudentProfile({...profile, dreamField: field, updatedAt: new Date().toISOString()}); }
  renderKepStudentDashboard();
  if(typeof renderStudentProfileSummaryV35 === 'function') renderStudentProfileSummaryV35();
  if(typeof renderWeeklyPlanV35 === 'function') renderWeeklyPlanV35();
});
document.querySelector('[data-clear-dashboard-progress]')?.addEventListener('click', () => {
  if(confirm('Clear practice progress saved in this browser?')){
    localStorage.removeItem('kepPracticeAttempts');
    renderKepStudentDashboard();
    if(typeof renderStudentProfileSummaryV35 === 'function') renderStudentProfileSummaryV35();
    if(typeof renderWeeklyPlanV35 === 'function') renderWeeklyPlanV35();
  }
});
renderKepStudentDashboard();


// KEP v3.5: Student Profile + Weekly Study Plan (local-first MVP)
const KEP_PROFILE_KEY = 'kepStudentProfileV35';
const KEP_WEEKLY_PLAN_KEY = 'kepWeeklyPlanV35';
const defaultStudyDays = ['Mon','Tue','Wed','Thu','Fri','Sat'];
const dayLabelsV35 = {Mon:'Monday', Tue:'Tuesday', Wed:'Wednesday', Thu:'Thursday', Fri:'Friday', Sat:'Saturday', Sun:'Sunday'};

function getKepStudentProfile(){
  try {
    return JSON.parse(localStorage.getItem(KEP_PROFILE_KEY) || '{}');
  } catch(e){ return {}; }
}
function saveKepStudentProfile(profile){
  localStorage.setItem(KEP_PROFILE_KEY, JSON.stringify(profile || {}));
}
function getSavedWeeklyPlan(){
  try { return JSON.parse(localStorage.getItem(KEP_WEEKLY_PLAN_KEY) || '[]'); } catch(e){ return []; }
}
function setFieldValue(selector, value){ const el = document.querySelector(selector); if(el && value !== undefined && value !== null) el.value = value; }
function getSelectedStudyDays(){
  const days = Array.from(document.querySelectorAll('[name="days"]:checked')).map(x => x.value);
  return days.length ? days : defaultStudyDays;
}
function readProfileForm(){
  const existing = getKepStudentProfile();
  return {
    name: (document.querySelector('[data-profile-name]')?.value || '').trim(),
    province: (document.querySelector('[data-profile-province]')?.value || '').trim(),
    level: document.querySelector('[data-profile-level]')?.value || existing.level || 'grade12',
    minutes: Number(document.querySelector('[data-profile-minutes]')?.value || existing.minutes || 60),
    language: document.querySelector('[data-profile-language]')?.value || existing.language || currentLang || 'en',
    targetDate: document.querySelector('[data-profile-target-date]')?.value || '',
    privateMode: Boolean(document.querySelector('[data-profile-private-mode]')?.checked),
    days: getSelectedStudyDays(),
    dreamField: document.querySelector('[data-dashboard-field]')?.value || localStorage.getItem('kepDreamField') || 'general',
    updatedAt: new Date().toISOString()
  };
}
function loadProfileForm(){
  const profile = getKepStudentProfile();
  setFieldValue('[data-profile-name]', profile.name || '');
  setFieldValue('[data-profile-province]', profile.province || '');
  setFieldValue('[data-profile-level]', profile.level || 'grade12');
  setFieldValue('[data-profile-minutes]', profile.minutes || 60);
  setFieldValue('[data-profile-language]', profile.language || currentLang || 'en');
  setFieldValue('[data-profile-target-date]', profile.targetDate || '');
  const privateMode = document.querySelector('[data-profile-private-mode]');
  if(privateMode) privateMode.checked = Boolean(profile.privateMode);
  const days = profile.days || defaultStudyDays;
  document.querySelectorAll('[name="days"]').forEach(cb => { cb.checked = days.includes(cb.value); });
  if(profile.dreamField){
    const fieldSelect = document.querySelector('[data-dashboard-field]');
    if(fieldSelect) fieldSelect.value = profile.dreamField;
    localStorage.setItem('kepDreamField', profile.dreamField);
  }
}
function getWeakSubjectForPlan(){
  const stats = getSubjectStats(getKepPracticeAttempts());
  return stats.length ? [...stats].sort((a,b)=>a.avg-b.avg || b.wrong-a.wrong)[0] : null;
}
function getPlanSubjectSequence(profile){
  const plan = getDreamFieldPlan(profile.dreamField || localStorage.getItem('kepDreamField') || 'general');
  const weak = getWeakSubjectForPlan();
  const subjects = [...(plan.focus || [])];
  if(weak && !subjects.map(s=>s.toLowerCase()).includes(String(weak.label).toLowerCase())) subjects.unshift(weak.label);
  return {subjects: subjects.length ? subjects : ['Mathematics','Science','Languages'], weak, fieldPlan: plan};
}
function createWeeklyPlan(profile){
  const p = profile && profile.minutes ? profile : {...getKepStudentProfile(), dreamField: localStorage.getItem('kepDreamField') || 'general'};
  const days = p.days && p.days.length ? p.days : defaultStudyDays;
  const minutes = Number(p.minutes || 60);
  const {subjects, weak, fieldPlan} = getPlanSubjectSequence(p);
  const allDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const plan = allDays.map((day, idx) => {
    const active = days.includes(day);
    const subject = subjects[idx % subjects.length];
    if(!active){
      return {day, active:false, subject:'Light review', minutes:10, title:'Rest or light reading', tasks:['Read one saved note or formula sheet','No pressure — protect your consistency','Prepare tomorrow’s subject']};
    }
    const isWeak = weak && subjectLabel(weak.subject) === subject;
    return {
      day,
      active:true,
      subject,
      minutes,
      title: `${subject}${isWeak ? ' weakness repair' : ' study block'}`,
      tasks:[
        `${Math.min(10, Math.max(5, Math.round(minutes*.12)))} min: quick revision of key points`,
        `${Math.max(10, Math.round(minutes*.45))} min: practise MCQs in ${subject}`,
        `${Math.max(8, Math.round(minutes*.25))} min: review wrong answers`,
        `${Math.max(5, Math.round(minutes*.12))} min: write 3 things to remember`
      ]
    };
  });
  localStorage.setItem(KEP_WEEKLY_PLAN_KEY, JSON.stringify(plan));
  return plan;
}
function renderWeeklyPlanV35(){
  const grid = document.querySelector('[data-weekly-plan-grid]');
  if(!grid) return;
  let plan = getSavedWeeklyPlan();
  if(!plan.length) plan = createWeeklyPlan(getKepStudentProfile());
  grid.innerHTML = plan.map(item => `
    <article class="weekly-day-card-v35 ${item.active ? '' : 'rest'}">
      <div class="weekly-day-top-v35"><span>${escapeHtml(dayLabelsV35[item.day] || item.day)}</span><b>${escapeHtml(item.active ? item.subject : 'Light')}</b></div>
      <h3>${escapeHtml(item.title)}</h3>
      <p class="small">${item.active ? `${item.minutes} minutes planned` : 'Optional light review day'}</p>
      <ul>${(item.tasks || []).map(task => `<li>${escapeHtml(task)}</li>`).join('')}</ul>
    </article>
  `).join('');
}
function renderStudentProfileSummaryV35(){
  const profile = getKepStudentProfile();
  const plan = getDreamFieldPlan(profile.dreamField || localStorage.getItem('kepDreamField') || 'general');
  const displayName = profile.privateMode ? 'Private learner' : (profile.name || 'Learner');
  setDashboardText('[data-student-greeting]', `Welcome back, ${displayName}.`);
  setDashboardText('[data-profile-summary-title]', profile.name || profile.privateMode ? `${displayName} • ${plan.label}` : `No profile saved yet`);
  const days = profile.days || defaultStudyDays;
  const mins = Number(profile.minutes || 60) * days.length;
  const place = profile.province ? ` from ${profile.province}` : '';
  const levelText = (profile.level || 'grade12').replace('grade12','Grade 12 / Kankor').replace('foundation','Foundation').replace('graduate','Graduate').replace('selfstudy','Self-study');
  const weak = getWeakSubjectForPlan();
  setDashboardText('[data-profile-summary-text]', profile.name || profile.privateMode || profile.province ? `${displayName}${place} is following ${plan.label}. Level: ${levelText}. ${weak ? `Current weak focus: ${weak.label}.` : 'Take a quiz to discover weak subjects.'}` : 'Save your profile and KEP will use your dream field, study time, weak subject, and language preference to create a weekly plan.');
  setDashboardText('[data-profile-days-count]', String(days.length));
  setDashboardText('[data-profile-minutes-total]', String(mins));
}
function renderKepV35ProfileAndPlan(){
  if(!document.querySelector('[data-student-dashboard-v35]')) return;
  loadProfileForm();
  renderStudentProfileSummaryV35();
  renderWeeklyPlanV35();
}

document.querySelector('[data-student-profile-form]')?.addEventListener('submit', e => {
  e.preventDefault();
  const profile = readProfileForm();
  saveKepStudentProfile(profile);
  localStorage.setItem('kepDreamField', profile.dreamField || 'general');
  if(profile.language && profile.language !== currentLang) applyKepLanguage(profile.language);
  createWeeklyPlan(profile);
  renderKepStudentDashboard();
  renderStudentProfileSummaryV35();
  renderWeeklyPlanV35();
  const status = document.querySelector('[data-profile-save-status]');
  if(status) status.textContent = 'Profile saved locally. Your weekly plan is updated.';
});
document.querySelectorAll('[data-generate-weekly-plan]').forEach(btn => btn.addEventListener('click', () => {
  const profile = {...getKepStudentProfile(), ...readProfileForm()};
  saveKepStudentProfile(profile);
  localStorage.setItem('kepDreamField', profile.dreamField || 'general');
  createWeeklyPlan(profile);
  renderKepStudentDashboard();
  renderStudentProfileSummaryV35();
  renderWeeklyPlanV35();
}));
document.querySelector('[data-print-weekly-plan]')?.addEventListener('click', () => window.print());
document.querySelector('[data-clear-weekly-plan]')?.addEventListener('click', () => {
  localStorage.removeItem(KEP_WEEKLY_PLAN_KEY);
  renderWeeklyPlanV35();
});
document.querySelector('[data-export-student-profile]')?.addEventListener('click', () => {
  const payload = {profile:getKepStudentProfile(), weeklyPlan:getSavedWeeklyPlan(), attempts:getKepPracticeAttempts(), exportedAt:new Date().toISOString()};
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'kep-student-profile-backup.json'; a.click();
  setTimeout(()=>URL.revokeObjectURL(url), 500);
});

renderKepV35ProfileAndPlan();


// KEP v3.8: Load published books, notes, PDFs, and past papers into Library
let kepPublishedResources = [];

function normalizeLibraryResource(resource){
  return {
    id: resource.id || `RES-${Date.now()}`,
    type: resource.type || 'Book / Notes',
    title: resource.title || 'Untitled resource',
    subject: resource.subject || 'General',
    language: resource.language || 'Not specified',
    year: resource.year || '',
    grade: resource.grade || '',
    resourceType: resource.resourceType || resource.type || 'Resource',
    sourceType: resource.sourceType || 'Reviewed source',
    sourceDetails: resource.sourceDetails || '',
    notes: resource.notes || '',
    fileUrl: resource.fileUrl || '',
    origin: resource.origin || ''
  };
}
function setLibraryResourceStatus(message, state=''){
  const el = document.querySelector('[data-library-resource-status]');
  if(!el) return;
  el.textContent = message;
  el.classList.remove('ok','warn');
  if(state) el.classList.add(state);
}
function getLibraryFilters(){
  const activeType = document.querySelector('[data-library-filter-type].active')?.getAttribute('data-library-filter-type') || 'All';
  const subject = document.querySelector('[data-library-filter-subject]')?.value || 'All';
  const language = document.querySelector('[data-library-filter-language]')?.value || 'All';
  return {activeType, subject, language};
}
function updateLibraryFilterOptions(resources){
  const subjectSelect = document.querySelector('[data-library-filter-subject]');
  const languageSelect = document.querySelector('[data-library-filter-language]');
  if(!subjectSelect || !languageSelect) return;
  const currentSubject = subjectSelect.value || 'All';
  const currentLanguage = languageSelect.value || 'All';
  const subjects = [...new Set(resources.map(r => r.subject).filter(Boolean))].sort();
  const languages = [...new Set(resources.map(r => r.language).filter(Boolean))].sort();
  subjectSelect.innerHTML = `<option value="All">All subjects</option>` + subjects.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
  languageSelect.innerHTML = `<option value="All">All languages</option>` + languages.map(l => `<option value="${escapeHtml(l)}">${escapeHtml(l)}</option>`).join('');
  subjectSelect.value = subjects.includes(currentSubject) ? currentSubject : 'All';
  languageSelect.value = languages.includes(currentLanguage) ? currentLanguage : 'All';
}
function renderPublishedLibraryResources(){
  const grid = document.querySelector('[data-library-resource-grid]');
  if(!grid) return;
  const {activeType, subject, language} = getLibraryFilters();
  const resources = kepPublishedResources.filter(r => {
    const typeOk = activeType === 'All' || r.type === activeType;
    const subjectOk = subject === 'All' || r.subject === subject;
    const languageOk = language === 'All' || r.language === language;
    return typeOk && subjectOk && languageOk;
  });
  if(!resources.length){
    grid.innerHTML = `<div class="empty-state-soft"><b>No matching approved resources.</b><span>Try another filter, or publish a book/paper from the Review Dashboard.</span></div>`;
    return;
  }
  grid.innerHTML = resources.map(r => `
    <article class="resource-card-live">
      <div class="resource-card-top">
        <span class="tag ${r.type === 'Past Paper' ? 'gold' : 'green'}">${escapeHtml(r.type)}</span>
        <span class="resource-lang">${escapeHtml(r.language)}</span>
      </div>
      <h3>${escapeHtml(r.title)}</h3>
      <p>${escapeHtml([r.subject, r.year || r.grade, r.resourceType].filter(Boolean).join(' • '))}</p>
      <div class="resource-source"><b>Source:</b> ${escapeHtml(r.sourceType)}${r.sourceDetails ? ' — ' + escapeHtml(r.sourceDetails) : ''}</div>
      ${r.notes ? `<div class="resource-note">${escapeHtml(r.notes)}</div>` : ''}
      ${r.origin ? `<div class="review-origin">${escapeHtml(r.origin)}</div>` : ''}
      <div class="small-actions">
        ${r.fileUrl ? `<a class="btn btn-primary" href="${escapeHtml(r.fileUrl)}" target="_blank" rel="noopener">Open resource</a>` : `<button class="btn btn-secondary" type="button" disabled>No file link</button>`}
        <button class="btn btn-secondary" type="button" data-save-resource="${escapeHtml(r.id)}">Save locally</button>
        <a class="btn btn-ghost" href="submit-content.html#correction">Report issue</a>
      </div>
    </article>
  `).join('');
  grid.querySelectorAll('[data-save-resource]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-save-resource');
      const saved = JSON.parse(localStorage.getItem('kepSavedResources') || '[]');
      if(!saved.includes(id)) saved.push(id);
      localStorage.setItem('kepSavedResources', JSON.stringify(saved));
      btn.textContent = 'Saved';
    });
  });
}
async function loadPublishedResourcesForLibrary(){
  const input = document.querySelector('[data-library-live-api-url]');
  const apiUrl = input?.value.trim() || localStorage.getItem('kepLiveApiUrl') || localStorage.getItem('kepPracticeApiUrl') || '';
  if(!apiUrl){
    setLibraryResourceStatus('Paste the Apps Script Web App URL first.', 'warn');
    return;
  }
  try{
    setLibraryResourceStatus('Loading approved library resources...');
    const payload = await jsonpRequest(apiUrl, {action:'publishedResources'});
    kepPublishedResources = (payload.resources || []).map(normalizeLibraryResource);
    localStorage.setItem('kepLibraryApiUrl', apiUrl);
    localStorage.setItem('kepLiveApiUrl', apiUrl);
    localStorage.setItem('kepPublishedResources', JSON.stringify(kepPublishedResources));
    updateLibraryFilterOptions(kepPublishedResources);
    renderPublishedLibraryResources();
    setLibraryResourceStatus(`Loaded ${kepPublishedResources.length} approved resource${kepPublishedResources.length === 1 ? '' : 's'} from Google Sheets.`, 'ok');
  }catch(err){
    setLibraryResourceStatus(err.message || 'Could not load approved resources.', 'warn');
  }
}
function loadLibraryResourceCache(){
  const input = document.querySelector('[data-library-live-api-url]');
  if(input) input.value = localStorage.getItem('kepLibraryApiUrl') || localStorage.getItem('kepLiveApiUrl') || localStorage.getItem('kepPracticeApiUrl') || '';
  const cached = JSON.parse(localStorage.getItem('kepPublishedResources') || '[]');
  if(cached.length){
    kepPublishedResources = cached.map(normalizeLibraryResource);
    updateLibraryFilterOptions(kepPublishedResources);
    renderPublishedLibraryResources();
    setLibraryResourceStatus(`Using ${cached.length} cached approved resource${cached.length === 1 ? '' : 's'}. Click “Load approved resources” to refresh.`, 'ok');
  }
}
document.querySelector('[data-load-published-resources]')?.addEventListener('click', loadPublishedResourcesForLibrary);
document.querySelector('[data-save-library-api]')?.addEventListener('click', () => {
  const input = document.querySelector('[data-library-live-api-url]');
  const apiUrl = input?.value.trim() || '';
  if(!apiUrl){ setLibraryResourceStatus('Paste the Apps Script Web App URL first.', 'warn'); return; }
  localStorage.setItem('kepLibraryApiUrl', apiUrl);
  localStorage.setItem('kepLiveApiUrl', apiUrl);
  setLibraryResourceStatus('Saved in this browser. Now click “Load approved resources”.', 'ok');
});
document.querySelector('[data-clear-library-cache]')?.addEventListener('click', () => {
  localStorage.removeItem('kepPublishedResources');
  kepPublishedResources = [];
  updateLibraryFilterOptions(kepPublishedResources);
  renderPublishedLibraryResources();
  setLibraryResourceStatus('Live library cache cleared. Sample library remains below.', '');
});
document.querySelectorAll('[data-library-filter-type]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-library-filter-type]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPublishedLibraryResources();
  });
});
document.querySelector('[data-library-filter-subject]')?.addEventListener('change', renderPublishedLibraryResources);
document.querySelector('[data-library-filter-language]')?.addEventListener('change', renderPublishedLibraryResources);
loadLibraryResourceCache();


// KEP v3.9: Mock Exam using Published Questions
let kepMockQuestions = [];
let kepMockExam = { questions: [], answers: {}, index: 0, startedAt: null, timeLimitSeconds: 0, timerHandle: null, mode: 'quick' };

function setMockStatus(message, state=''){
  const el = document.querySelector('[data-mock-status]');
  if(!el) return;
  el.textContent = message;
  el.classList.remove('ok','warn');
  if(state) el.classList.add(state);
}
function normalizeMockQuestion(q){
  const get = keys => getQuestionField(q, keys);
  const options = Array.isArray(q.options) ? q.options : [
    get(['optionA','option_a','Option A','A']),
    get(['optionB','option_b','Option B','B']),
    get(['optionC','option_c','Option C','C']),
    get(['optionD','option_d','Option D','D'])
  ].filter(Boolean);
  const rawCorrect = get(['correct','correctAnswer','correct_answer','answer','Answer','Correct Answer']);
  const correctIndex = resolveCorrectIndex(rawCorrect, options);
  return {
    id: q.id || `MQ-${Date.now()}-${Math.random()}`,
    subject: get(['subject','subject_name','subjectName','Subject']) || 'General',
    language: q.language || 'en',
    difficulty: q.difficulty || 'Medium',
    question: get(['question','questionText','question_text','Question','Question Text','q']),
    options: options.length ? options : ['A','B','C','D'],
    correct: options[correctIndex] || rawCorrect || '',
    explanation: get(['explanation','Explanation','explain']) || 'No explanation added yet.'
  };
}
function updateMockSubjectOptions(){
  const subjectSelect = document.querySelector('[data-mock-subject]');
  if(!subjectSelect) return;
  const current = subjectSelect.value || 'All';
  const subjects = [...new Set(kepMockQuestions.map(q => q.subject).filter(Boolean))].sort();
  subjectSelect.innerHTML = `<option value="All">All subjects</option>` + subjects.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
  subjectSelect.value = subjects.includes(current) ? current : 'All';
}
function updateMockCountOptions(){
  const countSelect = document.querySelector('[data-mock-count]');
  if(!countSelect) return;
  const type = document.querySelector('[data-mock-type]')?.value || 'quick';
  const subject = document.querySelector('[data-mock-subject]')?.value || 'All';
  const available = kepMockQuestions.filter(q => type !== 'subject' || subject === 'All' || q.subject === subject).length;
  const base = [1,5,10,20,30,50,100].filter(n => n <= available);
  if(available > 0 && !base.includes(available) && available < 100) base.unshift(available);
  const counts = [...new Set(base)].sort((a,b)=>a-b);
  countSelect.innerHTML = available === 0 ? `<option value="0">No questions</option>` : counts.map(n => `<option value="${n}">${n} question${n === 1 ? '' : 's'}</option>`).join('');
  if(available > 0 && available < 5) setMockStatus(`Only ${available} published question${available === 1 ? '' : 's'} available. Add more questions for a stronger mock.`, 'warn');
}
async function loadMockPublishedQuestions(){
  const input = document.querySelector('[data-mock-api-url]');
  const apiUrl = input?.value.trim() || localStorage.getItem('kepMockApiUrl') || localStorage.getItem('kepPracticeApiUrl') || localStorage.getItem('kepLiveApiUrl') || '';
  if(!apiUrl){ setMockStatus('Paste the Apps Script Web App URL first.', 'warn'); return; }
  try{
    setMockStatus('Loading published questions...');
    const payload = await jsonpRequest(apiUrl, {action:'publishedQuestions'});
    kepMockQuestions = (payload.questions || []).map(normalizeMockQuestion).filter(q => q.question && q.question !== 'Untitled question' && q.options.length >= 2);
    localStorage.setItem('kepMockApiUrl', apiUrl);
    localStorage.setItem('kepPracticeApiUrl', apiUrl);
    localStorage.setItem('kepLiveApiUrl', apiUrl);
    updateMockSubjectOptions();
    updateMockCountOptions();
    setMockStatus(`Loaded ${kepMockQuestions.length} published question${kepMockQuestions.length === 1 ? '' : 's'} for mock exams.`, 'ok');
  }catch(err){ setMockStatus(err.message || 'Could not load published questions.', 'warn'); }
}
function shuffleArray(arr){ return [...arr].sort(() => Math.random() - 0.5); }
function buildMockQuestionSet(){
  const type = document.querySelector('[data-mock-type]')?.value || 'quick';
  const subject = document.querySelector('[data-mock-subject]')?.value || 'All';
  const requestedCount = Number(document.querySelector('[data-mock-count]')?.value || 10);
  let pool = [...kepMockQuestions];
  if(type === 'subject' && subject !== 'All') pool = pool.filter(q => q.subject === subject);
  if(type === 'full'){
    const bySubject = {};
    pool.forEach(q => { (bySubject[q.subject] ||= []).push(q); });
    const balanced = [];
    const subjects = Object.keys(bySubject);
    while(balanced.length < requestedCount && subjects.some(s => bySubject[s].length)){
      for(const s of subjects){
        if(bySubject[s].length && balanced.length < requestedCount){
          balanced.push(shuffleArray(bySubject[s]).pop());
        }
      }
    }
    return shuffleArray(balanced).slice(0, requestedCount);
  }
  return shuffleArray(pool).slice(0, requestedCount);
}
function startMockExam(){
  if(!kepMockQuestions.length){ setMockStatus('Load published questions first.', 'warn'); return; }
  const questions = buildMockQuestionSet();
  if(!questions.length){ setMockStatus('No questions available for this template/subject.', 'warn'); return; }
  const requestedCount = Number(document.querySelector('[data-mock-count]')?.value || 0);
  if(requestedCount && questions.length < requestedCount){ setMockStatus(`Only ${questions.length} question${questions.length === 1 ? '' : 's'} available, so KEP started a smaller mock. Add more published questions for a full test.`, 'warn'); }
  const timeMinutes = Number(document.querySelector('[data-mock-time]')?.value || 0);
  kepMockExam = { questions, answers: {}, index: 0, startedAt: new Date().toISOString(), timeLimitSeconds: timeMinutes * 60, timerHandle: null, mode: document.querySelector('[data-mock-type]')?.value || 'quick', remainingSeconds: timeMinutes * 60 };
  document.querySelector('[data-mock-empty]')?.setAttribute('hidden','');
  document.querySelector('[data-mock-results]')?.setAttribute('hidden','');
  document.querySelector('[data-mock-shell]')?.removeAttribute('hidden');
  renderMockQuestion();
  startMockTimer();
}
function startMockTimer(){
  clearInterval(kepMockExam.timerHandle);
  renderMockTimer();
  if(!kepMockExam.timeLimitSeconds) return;
  kepMockExam.timerHandle = setInterval(() => {
    kepMockExam.remainingSeconds -= 1;
    renderMockTimer();
    if(kepMockExam.remainingSeconds <= 0){
      clearInterval(kepMockExam.timerHandle);
      submitMockExam(true);
    }
  }, 1000);
}
function renderMockTimer(){
  const el = document.querySelector('[data-mock-timer]');
  if(!el) return;
  if(!kepMockExam.timeLimitSeconds){ el.textContent = 'No timer'; return; }
  const seconds = Math.max(0, kepMockExam.remainingSeconds || 0);
  const m = Math.floor(seconds / 60).toString().padStart(2,'0');
  const s = (seconds % 60).toString().padStart(2,'0');
  el.textContent = `${m}:${s}`;
  el.classList.toggle('danger', seconds <= 60 && seconds > 0);
}
function renderMockQuestion(){
  const q = kepMockExam.questions[kepMockExam.index];
  if(!q) return;
  const total = kepMockExam.questions.length;
  document.querySelector('[data-mock-progress-title]').textContent = `Question ${kepMockExam.index + 1} of ${total}`;
  document.querySelector('[data-mock-mode-label]').textContent = { quick:'Quick Mock Exam', subject:'Subject Mock Exam', full:'Full Kankor-style Mock' }[kepMockExam.mode] || 'Mock Exam';
  document.querySelector('[data-mock-question-subject]').textContent = q.subject;
  document.querySelector('[data-mock-question-difficulty]').textContent = q.difficulty;
  document.querySelector('[data-mock-question-text]').textContent = q.question;
  const optionsEl = document.querySelector('[data-mock-options]');
  optionsEl.innerHTML = q.options.map((opt, idx) => {
    const id = `mock-${kepMockExam.index}-${idx}`;
    const checked = kepMockExam.answers[q.id] === opt ? 'checked' : '';
    return `<label class="mock-option" for="${id}"><input type="radio" id="${id}" name="mock-answer" value="${escapeHtml(opt)}" ${checked}><span>${escapeHtml(opt)}</span></label>`;
  }).join('');
  optionsEl.querySelectorAll('input').forEach(input => input.addEventListener('change', () => { kepMockExam.answers[q.id] = input.value; renderMockDots(); }));
  const bar = document.querySelector('[data-mock-progress-bar]');
  if(bar) bar.style.width = `${((kepMockExam.index + 1) / total) * 100}%`;
  renderMockDots();
}
function renderMockDots(){
  const dots = document.querySelector('[data-mock-dots]');
  if(!dots) return;
  dots.innerHTML = kepMockExam.questions.map((q, idx) => `<button class="${kepMockExam.answers[q.id] ? 'answered' : ''} ${idx === kepMockExam.index ? 'active' : ''}" type="button" data-go-mock="${idx}">${idx + 1}</button>`).join('');
  dots.querySelectorAll('[data-go-mock]').forEach(btn => btn.addEventListener('click', () => { kepMockExam.index = Number(btn.getAttribute('data-go-mock')); renderMockQuestion(); }));
}
function normalizeAnswer(value){ return String(value || '').trim().toLowerCase(); }
function submitMockExam(auto=false){
  clearInterval(kepMockExam.timerHandle);
  const total = kepMockExam.questions.length;
  let correct = 0;
  const subjectStats = {};
  const wrong = [];
  kepMockExam.questions.forEach(q => {
    const userAnswer = kepMockExam.answers[q.id] || '';
    const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(q.correct);
    if(isCorrect) correct++;
    subjectStats[q.subject] ||= {correct:0,total:0};
    subjectStats[q.subject].total++;
    if(isCorrect) subjectStats[q.subject].correct++;
    if(!isCorrect) wrong.push({...q, userAnswer});
  });
  const percentage = total ? Math.round((correct / total) * 100) : 0;
  const usedSeconds = Math.round((new Date() - new Date(kepMockExam.startedAt)) / 1000);
  const result = { id:`mock-${Date.now()}`, type:'Mock Exam', mode:kepMockExam.mode, score:correct, total, percentage, subjectStats, wrong, usedSeconds, createdAt:new Date().toISOString() };
  saveMockResultToDashboard(result);
  renderMockResults(result, auto);
}
function saveMockResultToDashboard(result){
  const attempts = JSON.parse(localStorage.getItem('kepPracticeAttempts') || '[]');
  attempts.unshift({ id:result.id, type:'mock', subject:'Mock Exam', score:result.score, total:result.total, percentage:result.percentage, wrong:result.wrong.map(q => ({question:q.question, subject:q.subject, correct:q.correct, selected:q.userAnswer})), createdAt:result.createdAt });
  localStorage.setItem('kepPracticeAttempts', JSON.stringify(attempts.slice(0,50)));
  localStorage.setItem('kepLastMockResult', JSON.stringify(result));
}
function fieldLevel(score){ return score >= 80 ? 'Strong' : score >= 60 ? 'Medium' : 'Needs work'; }
function getFieldReadiness(subjectStats, percentage){
  const pct = names => {
    for(const name of names){
      const s = subjectStats[name];
      if(s) return Math.round((s.correct / s.total) * 100);
    }
    return percentage;
  };
  const biology = pct(['Biology','بیولوژي','بیولوژی']);
  const chemistry = pct(['Chemistry','کیمیا']);
  const physics = pct(['Physics','فزیک','فیزیک']);
  const math = pct(['Mathematics','Math','ریاضي','ریاضی']);
  const english = pct(['English','انګلیسي','انگلیسی']);
  const language = pct(['Pashto','Dari','English','پښتو','دری','انګلیسي','انگلیسی']);
  return [
    {field:'Medicine', note:`${fieldLevel(Math.round((biology+chemistry+physics)/3))}: focus on Biology, Chemistry, and Physics.`},
    {field:'Engineering', note:`${fieldLevel(Math.round((math+physics)/2))}: focus on Mathematics, Physics, and speed.`},
    {field:'Computer Science', note:`${fieldLevel(Math.round((math+english)/2))}: improve Mathematics, logic, and English.`},
    {field:'Law / Social Sciences', note:`${fieldLevel(Math.round((language+percentage)/2))}: strengthen language, history, and general knowledge.`},
    {field:'Education', note:`${fieldLevel(percentage)}: continue balanced subject practice and weekly revision.`}
  ];
}
function formatSeconds(seconds){ const m = Math.floor(seconds / 60); const s = seconds % 60; return `${m}m ${s}s`; }
function renderMockResults(result, auto=false){
  const shell = document.querySelector('[data-mock-shell]');
  const results = document.querySelector('[data-mock-results]');
  if(!results) return;
  shell?.setAttribute('hidden','');
  results.removeAttribute('hidden');
  const statsHtml = Object.entries(result.subjectStats).map(([subject, s]) => {
    const pct = Math.round((s.correct / s.total) * 100);
    return `<div class="subject-score-row"><span>${escapeHtml(subject)}</span><b>${s.correct}/${s.total} • ${pct}%</b><div><span style="width:${pct}%"></span></div></div>`;
  }).join('');
  const readiness = getFieldReadiness(result.subjectStats, result.percentage).map(item => `<li><b>${escapeHtml(item.field)}:</b> ${escapeHtml(item.note)}</li>`).join('');
  const wrongHtml = result.wrong.length ? result.wrong.map(q => `<details class="review-detail"><summary>${escapeHtml(q.subject)} — ${escapeHtml(q.question)}</summary><p><b>Your answer:</b> ${escapeHtml(q.userAnswer || 'Not answered')}</p><p><b>Correct answer:</b> ${escapeHtml(q.correct)}</p><p>${escapeHtml(q.explanation)}</p></details>`).join('') : `<p class="success-text">Excellent — no wrong answers in this mock.</p>`;
  results.innerHTML = `<div class="card result-hero-card"><span class="eyebrow">${auto ? 'Time finished' : 'Mock completed'}</span><h2>Your mock exam result</h2><div class="result-stats"><div><b>${result.score}/${result.total}</b><span>Score</span></div><div><b>${result.percentage}%</b><span>Percentage</span></div><div><b>${formatSeconds(result.usedSeconds)}</b><span>Time used</span></div></div><div class="security-note">This is a study estimate only. Official Kankor placement depends on official exam results, capacity, competition, and NEXA rules.</div></div><div class="card"><h3>Subject breakdown</h3><div class="subject-score-list">${statsHtml}</div></div><div class="card"><h3>Field readiness estimate</h3><ul class="readiness-list">${readiness}</ul></div><div class="card"><h3>Wrong answer review</h3>${wrongHtml}<div class="small-actions"><a class="btn btn-primary" href="dashboard.html">Open dashboard</a><button class="btn btn-secondary" type="button" data-retake-mock>Retake mock</button></div></div>`;
  results.querySelector('[data-retake-mock]')?.addEventListener('click', () => { results.setAttribute('hidden',''); document.querySelector('[data-mock-empty]')?.removeAttribute('hidden'); });
}
function loadMockSavedUrl(){
  const input = document.querySelector('[data-mock-api-url]');
  if(input) input.value = localStorage.getItem('kepMockApiUrl') || localStorage.getItem('kepPracticeApiUrl') || localStorage.getItem('kepLiveApiUrl') || '';
}
document.querySelector('[data-load-mock-questions]')?.addEventListener('click', loadMockPublishedQuestions);
document.querySelector('[data-save-mock-api]')?.addEventListener('click', () => {
  const apiUrl = document.querySelector('[data-mock-api-url]')?.value.trim() || '';
  if(!apiUrl){ setMockStatus('Paste the Web App URL first.', 'warn'); return; }
  localStorage.setItem('kepMockApiUrl', apiUrl); localStorage.setItem('kepPracticeApiUrl', apiUrl); localStorage.setItem('kepLiveApiUrl', apiUrl);
  setMockStatus('Saved in this browser.', 'ok');
});
document.querySelector('[data-start-mock]')?.addEventListener('click', startMockExam);
document.querySelector('[data-prev-mock]')?.addEventListener('click', () => { kepMockExam.index = Math.max(0, kepMockExam.index - 1); renderMockQuestion(); });
document.querySelector('[data-next-mock]')?.addEventListener('click', () => { kepMockExam.index = Math.min(kepMockExam.questions.length - 1, kepMockExam.index + 1); renderMockQuestion(); });
document.querySelector('[data-submit-mock]')?.addEventListener('click', () => submitMockExam(false));
document.querySelector('[data-mock-type]')?.addEventListener('change', updateMockCountOptions);
document.querySelector('[data-mock-subject]')?.addEventListener('change', updateMockCountOptions);
loadMockSavedUrl();


// KEP v3.10: Kankor Rules Research + Exam Template Manager
const KEP_DEFAULT_TEMPLATES = [
  {
    id: 'quick-default',
    name: 'Quick Mock Exam',
    timeMinutes: 10,
    verificationStatus: 'Practice template',
    description: 'Short mixed practice. Not official Kankor format.',
    subjects: [{subject:'All subjects', count:10}]
  },
  {
    id: 'subject-default',
    name: 'Subject Mock Exam',
    timeMinutes: 20,
    verificationStatus: 'Practice template',
    description: 'Single-subject timed practice.',
    subjects: [{subject:'Selected subject', count:20}]
  },
  {
    id: 'flexible-full-default',
    name: 'Flexible Full Kankor-style Mock',
    timeMinutes: 60,
    verificationStatus: 'Needs verification',
    description: 'Balanced across available published subjects. Replace when official distribution is verified.',
    subjects: [{subject:'Balanced from available subjects', count:30}]
  }
];

function getKepRuleEntries(){
  return JSON.parse(localStorage.getItem('kepKankorRuleResearch') || '[]');
}
function saveKepRuleEntries(entries){
  localStorage.setItem('kepKankorRuleResearch', JSON.stringify(entries));
}
function getKepExamTemplates(){
  const saved = JSON.parse(localStorage.getItem('kepExamTemplates') || 'null');
  if(Array.isArray(saved) && saved.length) return saved;
  return KEP_DEFAULT_TEMPLATES;
}
function saveKepExamTemplates(templates){
  localStorage.setItem('kepExamTemplates', JSON.stringify(templates));
}
function renderRuleEntries(){
  const list = document.querySelector('[data-rules-list]');
  if(!list) return;
  const entries = getKepRuleEntries();
  if(!entries.length){
    list.innerHTML = `<div class="card empty-state-soft"><b>No rules saved yet.</b><span>Add a source before calling any full mock “official-style”.</span></div>`;
    return;
  }
  list.innerHTML = entries.map(entry => `
    <article class="card rule-entry-card">
      <div class="rule-card-head">
        <span class="tag ${entry.status === 'Verified' ? 'green' : 'gold'}">${escapeHtml(entry.status || 'Needs source')}</span>
        <button class="mini-danger" type="button" data-delete-rule="${escapeHtml(entry.id)}">Delete</button>
      </div>
      <h3>${escapeHtml(entry.year || 'Unknown year')} — ${escapeHtml(entry.sourceTitle || 'Untitled source')}</h3>
      <p><b>Source:</b> ${entry.sourceLink ? `<a href="${escapeHtml(entry.sourceLink)}" target="_blank" rel="noopener">${escapeHtml(entry.sourceLink)}</a>` : 'No link/reference added'}</p>
      <div class="rules-grid mini">
        <div><b>Total questions</b><span>${escapeHtml(entry.totalQuestions || 'To be verified')}</span></div>
        <div><b>Exam time</b><span>${escapeHtml(entry.examTime || 'To be verified')}</span></div>
      </div>
      <p><b>Subjects:</b> ${escapeHtml(entry.subjects || 'To be verified')}</p>
      <p><b>Distribution:</b> ${escapeHtml(entry.distribution || 'To be verified')}</p>
      <p><b>Marking:</b> ${escapeHtml(entry.marking || 'To be verified')}</p>
      <p class="small"><b>Verified by:</b> ${escapeHtml(entry.verifiedBy || 'Not yet')} • <b>Date:</b> ${escapeHtml(entry.dateChecked || 'Not checked')}</p>
    </article>
  `).join('');
  list.querySelectorAll('[data-delete-rule]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-delete-rule');
    saveKepRuleEntries(getKepRuleEntries().filter(e => e.id !== id));
    renderRuleEntries();
  }));
}
function initRuleForm(){
  const form = document.querySelector('[data-rules-form]');
  if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const entries = getKepRuleEntries();
    entries.unshift({id:`rule-${Date.now()}`, ...data, createdAt:new Date().toISOString()});
    saveKepRuleEntries(entries);
    form.reset();
    renderRuleEntries();
  });
}
function subjectRowHtml(subject='', count=''){
  return `<div class="template-subject-row">
    <input placeholder="Subject name" value="${escapeHtml(subject)}" data-template-subject-name>
    <input type="number" min="1" placeholder="Questions" value="${escapeHtml(String(count || ''))}" data-template-subject-count>
    <button class="mini-danger" type="button" data-remove-template-subject>×</button>
  </div>`;
}
function addTemplateSubjectRow(subject='', count=''){
  const wrap = document.querySelector('[data-template-subjects]');
  if(!wrap) return;
  wrap.insertAdjacentHTML('beforeend', subjectRowHtml(subject, count));
  wrap.querySelectorAll('[data-remove-template-subject]').forEach(btn => {
    btn.onclick = () => {
      btn.closest('.template-subject-row')?.remove();
    };
  });
}
function renderExamTemplates(){
  const list = document.querySelector('[data-template-list]');
  if(!list) return;
  const templates = getKepExamTemplates();
  list.innerHTML = templates.map(t => {
    const total = (t.subjects || []).reduce((sum, s) => sum + Number(s.count || 0), 0);
    return `<article class="card template-card">
      <div class="rule-card-head">
        <span class="tag ${t.verificationStatus === 'Verified official-style' ? 'green' : 'gold'}">${escapeHtml(t.verificationStatus || 'Practice template')}</span>
        <button class="mini-danger" type="button" data-delete-template="${escapeHtml(t.id)}">Delete</button>
      </div>
      <h3>${escapeHtml(t.name)}</h3>
      <p>${escapeHtml(t.description || 'No description added.')}</p>
      <div class="rules-grid mini">
        <div><b>Total questions</b><span>${total || 'Flexible'}</span></div>
        <div><b>Time limit</b><span>${escapeHtml(String(t.timeMinutes || 0))} minutes</span></div>
      </div>
      <ul class="template-subject-list">${(t.subjects || []).map(s => `<li><span>${escapeHtml(s.subject)}</span><b>${escapeHtml(String(s.count))}</b></li>`).join('')}</ul>
    </article>`;
  }).join('');
  list.querySelectorAll('[data-delete-template]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-delete-template');
    saveKepExamTemplates(getKepExamTemplates().filter(t => t.id !== id));
    renderExamTemplates();
    populateMockTemplateSelect();
  }));
}
function initTemplateForm(){
  const form = document.querySelector('[data-template-form]');
  if(!form) return;
  const wrap = document.querySelector('[data-template-subjects]');
  if(wrap && !wrap.children.length){
    addTemplateSubjectRow('Mathematics', 10);
    addTemplateSubjectRow('Physics', 10);
  }
  document.querySelector('[data-add-template-subject]')?.addEventListener('click', () => addTemplateSubjectRow());
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const subjects = [...document.querySelectorAll('.template-subject-row')].map(row => ({
      subject: row.querySelector('[data-template-subject-name]')?.value.trim() || '',
      count: Number(row.querySelector('[data-template-subject-count]')?.value || 0)
    })).filter(s => s.subject && s.count > 0);
    const templates = getKepExamTemplates().filter(t => !String(t.id).endsWith('-default'));
    templates.unshift({id:`tpl-${Date.now()}`, ...data, timeMinutes:Number(data.timeMinutes || 0), subjects, createdAt:new Date().toISOString()});
    saveKepExamTemplates([...templates, ...KEP_DEFAULT_TEMPLATES]);
    form.reset();
    const subjectWrap = document.querySelector('[data-template-subjects]');
    if(subjectWrap) subjectWrap.innerHTML = '';
    addTemplateSubjectRow('Mathematics', 10);
    renderExamTemplates();
    populateMockTemplateSelect();
  });
}
function downloadJsonFile(filename, data){
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
document.querySelector('[data-export-rules]')?.addEventListener('click', () => downloadJsonFile('kep-kankor-rules-research.json', getKepRuleEntries()));
document.querySelector('[data-export-templates]')?.addEventListener('click', () => downloadJsonFile('kep-exam-templates.json', getKepExamTemplates()));
document.querySelector('[data-reset-templates]')?.addEventListener('click', () => {
  localStorage.removeItem('kepExamTemplates');
  renderExamTemplates();
  populateMockTemplateSelect();
});
initRuleForm();
renderRuleEntries();
initTemplateForm();
renderExamTemplates();

// Mock Exam template integration
function populateMockTemplateSelect(){
  const select = document.querySelector('[data-mock-template]');
  if(!select) return;
  const current = select.value || '';
  const templates = getKepExamTemplates();
  select.innerHTML = `<option value="">Default / no saved template</option>` + templates.map(t => `<option value="${escapeHtml(t.id)}">${escapeHtml(t.name)} (${escapeHtml(t.verificationStatus || 'Template')})</option>`).join('');
  select.value = templates.some(t => t.id === current) ? current : '';
}
function getSelectedMockTemplate(){
  const id = document.querySelector('[data-mock-template]')?.value || '';
  if(!id) return null;
  return getKepExamTemplates().find(t => t.id === id) || null;
}
function pickQuestionsForSubject(subject, count, pool){
  if(!subject || subject === 'All subjects' || subject === 'Balanced from available subjects'){
    return shuffleArray(pool).slice(0, count);
  }
  const exact = pool.filter(q => String(q.subject).toLowerCase() === String(subject).toLowerCase());
  if(exact.length >= count) return shuffleArray(exact).slice(0, count);
  const loose = pool.filter(q => String(q.subject).toLowerCase().includes(String(subject).toLowerCase()) || String(subject).toLowerCase().includes(String(q.subject).toLowerCase()));
  const combined = [...exact, ...loose.filter(q => !exact.includes(q))];
  if(combined.length >= count) return shuffleArray(combined).slice(0, count);
  const fallback = shuffleArray(pool.filter(q => !combined.includes(q))).slice(0, Math.max(0, count - combined.length));
  return [...combined, ...fallback].slice(0, count);
}
function buildMockQuestionSet(){
  const template = getSelectedMockTemplate();
  if(template && Array.isArray(template.subjects) && template.subjects.length){
    let selected = [];
    const pool = [...kepMockQuestions];
    template.subjects.forEach(item => {
      selected = [...selected, ...pickQuestionsForSubject(item.subject, Number(item.count || 0), pool).filter(q => !selected.includes(q))];
    });
    const totalNeeded = template.subjects.reduce((sum, s) => sum + Number(s.count || 0), 0);
    if(selected.length < totalNeeded){
      selected = [...selected, ...shuffleArray(pool.filter(q => !selected.includes(q))).slice(0, totalNeeded - selected.length)];
    }
    return shuffleArray(selected).slice(0, totalNeeded || selected.length);
  }

  const type = document.querySelector('[data-mock-type]')?.value || 'quick';
  const subject = document.querySelector('[data-mock-subject]')?.value || 'All';
  const requestedCount = Number(document.querySelector('[data-mock-count]')?.value || 10);
  let pool = [...kepMockQuestions];
  if(type === 'subject' && subject !== 'All') pool = pool.filter(q => q.subject === subject);
  if(type === 'full'){
    const bySubject = {};
    pool.forEach(q => { (bySubject[q.subject] ||= []).push(q); });
    const balanced = [];
    const subjects = Object.keys(bySubject);
    while(balanced.length < requestedCount && subjects.some(s => bySubject[s].length)){
      for(const s of subjects){
        if(bySubject[s].length && balanced.length < requestedCount){
          balanced.push(shuffleArray(bySubject[s]).pop());
        }
      }
    }
    return shuffleArray(balanced).slice(0, requestedCount);
  }
  return shuffleArray(pool).slice(0, requestedCount);
}
function startMockExam(){
  if(!kepMockQuestions.length){ setMockStatus('Load published questions first.', 'warn'); return; }
  const template = getSelectedMockTemplate();
  const questions = buildMockQuestionSet();
  if(!questions.length){ setMockStatus('No questions available for this template/subject.', 'warn'); return; }
  const requestedCount = Number(document.querySelector('[data-mock-count]')?.value || 0);
  if(requestedCount && questions.length < requestedCount){ setMockStatus(`Only ${questions.length} question${questions.length === 1 ? '' : 's'} available, so KEP started a smaller mock. Add more published questions for a full test.`, 'warn'); }
  const timeMinutes = template ? Number(template.timeMinutes || 0) : Number(document.querySelector('[data-mock-time]')?.value || 0);
  kepMockExam = { questions, answers: {}, index: 0, startedAt: new Date().toISOString(), timeLimitSeconds: timeMinutes * 60, timerHandle: null, mode: template ? template.name : (document.querySelector('[data-mock-type]')?.value || 'quick'), remainingSeconds: timeMinutes * 60, template };
  document.querySelector('[data-mock-empty]')?.setAttribute('hidden','');
  document.querySelector('[data-mock-results]')?.setAttribute('hidden','');
  document.querySelector('[data-mock-shell]')?.removeAttribute('hidden');
  renderMockQuestion();
  startMockTimer();
}
function renderMockQuestion(){
  const q = kepMockExam.questions[kepMockExam.index];
  if(!q) return;
  const total = kepMockExam.questions.length;
  document.querySelector('[data-mock-progress-title]').textContent = `Question ${kepMockExam.index + 1} of ${total}`;
  const label = kepMockExam.template ? `${kepMockExam.template.name} • ${kepMockExam.template.verificationStatus}` : ({ quick:'Quick Mock Exam', subject:'Subject Mock Exam', full:'Full Kankor-style Mock' }[kepMockExam.mode] || 'Mock Exam');
  document.querySelector('[data-mock-mode-label]').textContent = label;
  document.querySelector('[data-mock-question-subject]').textContent = q.subject;
  document.querySelector('[data-mock-question-difficulty]').textContent = q.difficulty;
  document.querySelector('[data-mock-question-text]').textContent = q.question;
  const optionsEl = document.querySelector('[data-mock-options]');
  optionsEl.innerHTML = q.options.map((opt, idx) => {
    const id = `mock-${kepMockExam.index}-${idx}`;
    const checked = kepMockExam.answers[q.id] === opt ? 'checked' : '';
    return `<label class="mock-option" for="${id}"><input type="radio" id="${id}" name="mock-answer" value="${escapeHtml(opt)}" ${checked}><span>${escapeHtml(opt)}</span></label>`;
  }).join('');
  optionsEl.querySelectorAll('input').forEach(input => input.addEventListener('change', () => { kepMockExam.answers[q.id] = input.value; renderMockDots(); }));
  const bar = document.querySelector('[data-mock-progress-bar]');
  if(bar) bar.style.width = `${((kepMockExam.index + 1) / total) * 100}%`;
  renderMockDots();
}
document.querySelector('[data-mock-template]')?.addEventListener('change', () => {
  const template = getSelectedMockTemplate();
  if(template){
    const timeInput = document.querySelector('[data-mock-time]');
    const total = (template.subjects || []).reduce((sum, s) => sum + Number(s.count || 0), 0);
    setMockStatus(`Selected template: ${template.name}. ${total} questions, ${template.timeMinutes || 0} minutes.`, 'ok');
    if(timeInput){
      const val = String(template.timeMinutes || 0);
      if([...timeInput.options].some(o => o.value === val)) timeInput.value = val;
    }
  }
});
populateMockTemplateSelect();

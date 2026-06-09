
-- KEP v6.1 — Content Launch Pack
-- Purpose: give KEP a clean starter content set for controlled testing.
-- Important: this is starter educational content, not an official Kankor question bank.
-- Review and localise before public release.

-- =========================
-- 1) Starter Subjects
-- =========================
insert into public.subjects (name, slug, description, status)
values
  ('Mathematics', 'mathematics', 'Algebra, geometry, arithmetic, and problem solving practice.', 'published'),
  ('Physics', 'physics', 'Basic mechanics, electricity, measurement, and general science practice.', 'published'),
  ('Chemistry', 'chemistry', 'Atoms, reactions, acids, bases, and core chemistry concepts.', 'published'),
  ('Biology', 'biology', 'Cells, human body, plants, ecology, and biology foundations.', 'published'),
  ('English', 'english', 'Vocabulary, grammar, reading, and sentence practice.', 'published'),
  ('Islamic Studies', 'islamic-studies', 'Core Islamic knowledge practice with respectful explanations.', 'published'),
  ('General Knowledge', 'general-knowledge', 'General awareness, reasoning, and basic knowledge practice.', 'published')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  status = excluded.status;

-- =========================
-- 2) Starter Questions
-- These are intentionally simple, reviewed-style samples.
-- Replace or expand with verified Kankor-style content before wider launch.
-- =========================

insert into public.questions
(subject_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty, status, source_note)
select s.id, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer, q.explanation, q.difficulty, q.status, q.source_note
from public.subjects s
join (values
  ('mathematics', 'What is 12 × 8?', '80', '88', '96', '108', '96', '12 multiplied by 8 equals 96.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('mathematics', 'If x + 7 = 15, what is x?', '6', '7', '8', '9', '8', 'Subtract 7 from both sides: x = 15 - 7 = 8.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('mathematics', 'What is the area of a rectangle with length 6 and width 4?', '10', '18', '24', '28', '24', 'Area of a rectangle = length × width. 6 × 4 = 24.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('mathematics', 'What is 25% of 200?', '25', '40', '50', '75', '50', '25% means one quarter. One quarter of 200 is 50.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),

  ('physics', 'Which unit is used to measure force?', 'Joule', 'Newton', 'Watt', 'Volt', 'Newton', 'Force is measured in Newtons.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('physics', 'What force pulls objects toward Earth?', 'Friction', 'Gravity', 'Magnetism', 'Pressure', 'Gravity', 'Gravity is the force that attracts objects toward Earth.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('physics', 'Which quantity is calculated by distance divided by time?', 'Speed', 'Mass', 'Force', 'Energy', 'Speed', 'Speed = distance ÷ time.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('physics', 'Which simple device is used to open and close an electric circuit?', 'Switch', 'Battery', 'Bulb', 'Wire', 'Switch', 'A switch controls whether current can flow in a circuit.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),

  ('chemistry', 'What is the chemical symbol for water?', 'CO2', 'H2O', 'O2', 'NaCl', 'H2O', 'Water is made of hydrogen and oxygen, with the formula H2O.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('chemistry', 'Which particle has a negative charge?', 'Proton', 'Neutron', 'Electron', 'Nucleus', 'Electron', 'Electrons are negatively charged particles.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('chemistry', 'What is common table salt called chemically?', 'Sodium chloride', 'Calcium carbonate', 'Hydrogen peroxide', 'Carbon dioxide', 'Sodium chloride', 'Table salt is sodium chloride, written as NaCl.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('chemistry', 'A substance with pH less than 7 is usually called what?', 'Base', 'Acid', 'Salt', 'Metal', 'Acid', 'Acids usually have pH values below 7.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),

  ('biology', 'What is the basic unit of life?', 'Atom', 'Cell', 'Tissue', 'Organ', 'Cell', 'The cell is the basic structural and functional unit of life.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('biology', 'Which organ pumps blood through the body?', 'Lung', 'Liver', 'Heart', 'Kidney', 'Heart', 'The heart pumps blood around the body.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('biology', 'Which part of a plant absorbs water from soil?', 'Flower', 'Root', 'Leaf', 'Fruit', 'Root', 'Roots absorb water and minerals from soil.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('biology', 'Which gas do humans mainly need for breathing?', 'Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen', 'Oxygen', 'Humans need oxygen for respiration.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),

  ('english', 'Choose the correct sentence.', 'She go to school.', 'She goes to school.', 'She going to school.', 'She gone to school.', 'She goes to school.', 'For third-person singular in the present simple, we use “goes”.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('english', 'What is the opposite of “strong”?', 'Powerful', 'Weak', 'Large', 'Fast', 'Weak', 'The opposite of strong is weak.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('english', 'Which word is a noun?', 'Run', 'Beautiful', 'Book', 'Quickly', 'Book', 'A noun names a person, place, thing, or idea. Book is a thing.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('english', 'Complete the sentence: I ____ a student.', 'am', 'is', 'are', 'be', 'am', 'With “I”, the correct form of the verb “to be” is “am”.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),

  ('islamic-studies', 'How many daily obligatory prayers are there in Islam?', 'Three', 'Four', 'Five', 'Six', 'Five', 'Muslims perform five daily obligatory prayers.', 'easy', 'published', 'KEP v6.1 starter sample — review respectfully before public launch.'),
  ('islamic-studies', 'What is the holy book of Islam?', 'Torah', 'Quran', 'Bible', 'Zabur', 'Quran', 'The Quran is the holy book of Islam.', 'easy', 'published', 'KEP v6.1 starter sample — review respectfully before public launch.'),
  ('general-knowledge', 'Which planet do humans live on?', 'Mars', 'Earth', 'Venus', 'Jupiter', 'Earth', 'Humans live on planet Earth.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.'),
  ('general-knowledge', 'How many days are usually in one week?', '5', '6', '7', '8', '7', 'A week usually has seven days.', 'easy', 'published', 'KEP v6.1 starter sample — verify before public launch.')
) as q(slug, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty, status, source_note)
on s.slug = q.slug
where not exists (
  select 1 from public.questions existing
  where lower(existing.question_text) = lower(q.question_text)
);

-- =========================
-- 3) Starter Library Resources
-- =========================
insert into public.resources (title, resource_type, subject_id, description, url, status, source_note)
select r.title, r.resource_type, s.id, r.description, r.url, r.status, r.source_note
from public.subjects s
join (values
  ('Mathematics Starter Pack', 'study_pack', 'mathematics', 'Starter notes and practice plan for basic mathematics revision.', '', 'published', 'KEP v6.1 placeholder resource — replace with real verified file/link.'),
  ('Physics Starter Pack', 'study_pack', 'physics', 'Starter notes and practice plan for basic physics revision.', '', 'published', 'KEP v6.1 placeholder resource — replace with real verified file/link.'),
  ('Chemistry Starter Pack', 'study_pack', 'chemistry', 'Starter notes and practice plan for basic chemistry revision.', '', 'published', 'KEP v6.1 placeholder resource — replace with real verified file/link.'),
  ('Biology Starter Pack', 'study_pack', 'biology', 'Starter notes and practice plan for basic biology revision.', '', 'published', 'KEP v6.1 placeholder resource — replace with real verified file/link.'),
  ('English Grammar Starter Pack', 'study_pack', 'english', 'Starter grammar and vocabulary revision plan.', '', 'published', 'KEP v6.1 placeholder resource — replace with real verified file/link.')
) as r(title, resource_type, slug, description, url, status, source_note)
on s.slug = r.slug
where not exists (
  select 1 from public.resources existing
  where lower(existing.title) = lower(r.title)
);

-- =========================
-- 4) Starter Mock Template
-- =========================
insert into public.exam_templates (name, description, total_questions, duration_minutes, status, template_json)
values (
  'KEP Starter Mock — 20 Questions',
  'A small testing mock for controlled launch. This is not an official Kankor template.',
  20,
  20,
  'published',
  '{
    "note": "KEP starter testing template only. Verify official structure before public launch.",
    "sections": [
      {"subject": "Mathematics", "questions": 4},
      {"subject": "Physics", "questions": 4},
      {"subject": "Chemistry", "questions": 4},
      {"subject": "Biology", "questions": 4},
      {"subject": "English", "questions": 4}
    ]
  }'::jsonb
)
on conflict do nothing;

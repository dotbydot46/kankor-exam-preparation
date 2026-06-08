-- KEP v5.1 — Sample Content for Supabase Testing
-- Run after the main v4.0 database schema.
-- This gives you test questions, resources, and templates so Practice DB, Mock DB, Library DB, Study Plan, and Student Home can be tested.

insert into public.subjects (name, slug, language, description) values
('Mathematics', 'mathematics', 'English', 'Sample math questions for KEP testing'),
('Physics', 'physics', 'English', 'Sample physics questions for KEP testing'),
('Chemistry', 'chemistry', 'English', 'Sample chemistry questions for KEP testing'),
('Biology', 'biology', 'English', 'Sample biology questions for KEP testing'),
('English', 'english', 'English', 'Sample English questions for KEP testing')
on conflict (slug) do nothing;

insert into public.questions
(subject_name, question_text, options, correct_answer, explanation, difficulty, language, source_type, source_details, status)
values
('Mathematics', 'What is 12 × 8?', '["84","88","96","108"]'::jsonb, '96', '12 multiplied by 8 equals 96.', 'Easy', 'English', 'KEP sample', 'Testing only', 'published'),
('Mathematics', 'If x + 5 = 13, what is x?', '["5","6","7","8"]'::jsonb, '8', 'Subtract 5 from both sides: x = 8.', 'Easy', 'English', 'KEP sample', 'Testing only', 'published'),
('Physics', 'Which unit is used for force?', '["Joule","Newton","Watt","Volt"]'::jsonb, 'Newton', 'Force is measured in Newtons.', 'Easy', 'English', 'KEP sample', 'Testing only', 'published'),
('Physics', 'Speed is calculated by:', '["distance ÷ time","time ÷ distance","mass × acceleration","force × distance"]'::jsonb, 'distance ÷ time', 'Speed = distance divided by time.', 'Easy', 'English', 'KEP sample', 'Testing only', 'published'),
('Chemistry', 'What is the chemical symbol for water?', '["O2","CO2","H2O","NaCl"]'::jsonb, 'H2O', 'Water contains two hydrogen atoms and one oxygen atom.', 'Easy', 'English', 'KEP sample', 'Testing only', 'published'),
('Chemistry', 'Which of these is a noble gas?', '["Oxygen","Nitrogen","Helium","Hydrogen"]'::jsonb, 'Helium', 'Helium is a noble gas.', 'Easy', 'English', 'KEP sample', 'Testing only', 'published'),
('Biology', 'Which part of the plant makes food?', '["Root","Leaf","Stem","Flower"]'::jsonb, 'Leaf', 'Leaves make food by photosynthesis.', 'Easy', 'English', 'KEP sample', 'Testing only', 'published'),
('Biology', 'DNA is mainly found in the:', '["Nucleus","Cell wall","Ribosome","Cytoplasm only"]'::jsonb, 'Nucleus', 'In eukaryotic cells, DNA is mainly stored in the nucleus.', 'Medium', 'English', 'KEP sample', 'Testing only', 'published'),
('English', 'Choose the correct sentence.', '["He go to school.","He goes to school.","He going to school.","He gone to school."]'::jsonb, 'He goes to school.', 'For third-person singular in present simple, use goes.', 'Easy', 'English', 'KEP sample', 'Testing only', 'published'),
('English', 'What is the opposite of “difficult”?', '["Hard","Easy","Heavy","Strong"]'::jsonb, 'Easy', 'Easy is the opposite of difficult.', 'Easy', 'English', 'KEP sample', 'Testing only', 'published');

insert into public.resources
(title, resource_type, subject_name, language, grade, year, file_url, source_type, source_details, status)
values
('KEP Sample Math Notes', 'Book / Notes', 'Mathematics', 'English', 'Grade 12', '2026', 'https://example.com/math-notes.pdf', 'KEP sample', 'Testing only placeholder link', 'published'),
('KEP Sample Physics Notes', 'Book / Notes', 'Physics', 'English', 'Grade 12', '2026', 'https://example.com/physics-notes.pdf', 'KEP sample', 'Testing only placeholder link', 'published'),
('KEP Sample Biology Review', 'Book / Notes', 'Biology', 'English', 'Grade 12', '2026', 'https://example.com/biology-review.pdf', 'KEP sample', 'Testing only placeholder link', 'published'),
('KEP Sample Past Paper', 'Past Paper', 'General', 'English', 'Grade 12', '2026', 'https://example.com/sample-past-paper.pdf', 'KEP sample', 'Testing only placeholder link', 'published');

insert into public.exam_templates
(name, description, time_minutes, verification_status, distribution, source_note, status)
values
('KEP v5.1 Quick Test Mock', 'Small sample mock for testing database setup only.', 10, 'Practice template', '[{"subject":"Mathematics","count":2},{"subject":"Physics","count":2},{"subject":"English","count":1}]'::jsonb, 'KEP v5.1 sample content', 'published'),
('KEP v5.1 Science Test Mock', 'Sample science-heavy mock for checking template selection.', 15, 'Practice template', '[{"subject":"Biology","count":2},{"subject":"Chemistry","count":2},{"subject":"Physics","count":1}]'::jsonb, 'KEP v5.1 sample content', 'published');

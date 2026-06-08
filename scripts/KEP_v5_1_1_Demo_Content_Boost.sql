-- KEP v5.1.1 — Demo Content Boost
-- Purpose: add enough safe demo questions to test mock exams properly.
-- This content is for system testing only. It is not official Kankor content.
-- Safe to run once. It will not run again if this demo batch already exists.

insert into public.subjects (name, slug, language, description) values
('Mathematics', 'mathematics', 'English', 'KEP demo subject for system testing'),
('Physics', 'physics', 'English', 'KEP demo subject for system testing'),
('Chemistry', 'chemistry', 'English', 'KEP demo subject for system testing'),
('Biology', 'biology', 'English', 'KEP demo subject for system testing'),
('English', 'english', 'English', 'KEP demo subject for system testing'),
('General Knowledge', 'general-knowledge', 'English', 'KEP demo subject for system testing')
on conflict (slug) do nothing;

do $$
begin
  if not exists (
    select 1 from public.questions
    where source_type = 'KEP v5.1.1 demo'
    limit 1
  ) then
    insert into public.questions
    (subject_name, question_text, options, correct_answer, explanation, difficulty, language, source_type, source_details, status)
    values
    ('Mathematics', 'What is 15 × 6?', '["70", "80", "90", "100"]'::jsonb, '90', '15 multiplied by 6 equals 90.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Mathematics', 'If 3x = 21, what is x?', '["6", "7", "8", "9"]'::jsonb, '7', 'Divide both sides by 3: x = 7.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Mathematics', 'What is the square root of 144?', '["10", "11", "12", "14"]'::jsonb, '12', '12 × 12 = 144.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Mathematics', 'What is 25% of 200?', '["25", "40", "50", "75"]'::jsonb, '50', '25% means one quarter. One quarter of 200 is 50.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Mathematics', 'If a triangle has angles 60° and 70°, what is the third angle?', '["40°", "50°", "60°", "70°"]'::jsonb, '50°', 'Angles in a triangle add to 180°. 180 - 130 = 50.', 'Medium', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Mathematics', 'What is 9²?', '["18", "72", "81", "99"]'::jsonb, '81', '9 squared means 9 × 9 = 81.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Mathematics', 'Solve: 2x + 4 = 14', '["4", "5", "6", "7"]'::jsonb, '5', '2x = 10, so x = 5.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Mathematics', 'What is the value of π approximately?', '["2.14", "3.14", "4.13", "1.34"]'::jsonb, '3.14', 'Pi is approximately 3.14.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Mathematics', 'What is 7/10 as a decimal?', '["0.07", "0.7", "7.0", "0.17"]'::jsonb, '0.7', 'Seven tenths equals 0.7.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Mathematics', 'If 5 books cost 250 AFS, what is the cost of one book?', '["25 AFS", "40 AFS", "50 AFS", "60 AFS"]'::jsonb, '50 AFS', '250 divided by 5 equals 50.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Mathematics', 'What is 18 + 27?', '["35", "42", "45", "48"]'::jsonb, '45', '18 + 27 = 45.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Mathematics', 'What is 1000 ÷ 25?', '["25", "30", "40", "50"]'::jsonb, '40', '25 × 40 = 1000.', 'Medium', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'Which unit is used for force?', '["Joule", "Newton", "Watt", "Volt"]'::jsonb, 'Newton', 'Force is measured in Newtons.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'Speed is calculated by:', '["distance ÷ time", "time ÷ distance", "mass × acceleration", "force × distance"]'::jsonb, 'distance ÷ time', 'Speed equals distance divided by time.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'What is the SI unit of energy?', '["Newton", "Joule", "Pascal", "Ampere"]'::jsonb, 'Joule', 'Energy is measured in Joules.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'Which instrument measures temperature?', '["Barometer", "Thermometer", "Ammeter", "Voltmeter"]'::jsonb, 'Thermometer', 'A thermometer measures temperature.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'What force pulls objects toward Earth?', '["Friction", "Magnetism", "Gravity", "Tension"]'::jsonb, 'Gravity', 'Gravity pulls objects toward Earth.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'Light travels fastest in:', '["water", "glass", "air", "vacuum"]'::jsonb, 'vacuum', 'Light travels fastest in a vacuum.', 'Medium', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'The unit of electric current is:', '["Volt", "Ampere", "Ohm", "Watt"]'::jsonb, 'Ampere', 'Electric current is measured in amperes.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'A mirror mainly reflects:', '["sound", "light", "heat only", "electricity"]'::jsonb, 'light', 'Mirrors reflect light.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'If mass increases and acceleration stays same, force:', '["decreases", "increases", "becomes zero", "does not exist"]'::jsonb, 'increases', 'F = ma, so greater mass gives greater force.', 'Medium', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'Which type of energy is stored in a stretched spring?', '["Kinetic", "Potential", "Thermal", "Chemical"]'::jsonb, 'Potential', 'A stretched spring stores elastic potential energy.', 'Medium', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'Sound cannot travel through:', '["air", "water", "steel", "vacuum"]'::jsonb, 'vacuum', 'Sound needs a medium to travel.', 'Medium', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Physics', 'Which device measures electric voltage?', '["Ammeter", "Voltmeter", "Thermometer", "Compass"]'::jsonb, 'Voltmeter', 'A voltmeter measures voltage.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'What is the chemical symbol for water?', '["O2", "CO2", "H2O", "NaCl"]'::jsonb, 'H2O', 'Water contains hydrogen and oxygen.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'Which of these is a noble gas?', '["Oxygen", "Nitrogen", "Helium", "Hydrogen"]'::jsonb, 'Helium', 'Helium is a noble gas.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'What is the symbol for oxygen?', '["O", "Ox", "Og", "Om"]'::jsonb, 'O', 'Oxygen''s chemical symbol is O.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'NaCl is commonly known as:', '["sugar", "salt", "water", "lime"]'::jsonb, 'salt', 'NaCl is sodium chloride, common salt.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'A substance with pH less than 7 is:', '["acidic", "basic", "neutral", "metallic"]'::jsonb, 'acidic', 'Acids have pH below 7.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'The center of an atom is called the:', '["electron", "nucleus", "shell", "bond"]'::jsonb, 'nucleus', 'The nucleus is at the center of an atom.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'Which particle has a negative charge?', '["Proton", "Neutron", "Electron", "Nucleus"]'::jsonb, 'Electron', 'Electrons carry negative charge.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'CO2 means:', '["carbon monoxide", "carbon dioxide", "calcium oxide", "copper oxide"]'::jsonb, 'carbon dioxide', 'CO2 is carbon dioxide.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'Which process separates salt from water by heating?', '["filtration", "evaporation", "freezing", "magnetism"]'::jsonb, 'evaporation', 'Heating water leaves salt behind.', 'Medium', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'A base usually has pH:', '["less than 7", "equal to 0", "greater than 7", "always 7"]'::jsonb, 'greater than 7', 'Bases have pH above 7.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'Which gas do plants use in photosynthesis?', '["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"]'::jsonb, 'Carbon dioxide', 'Plants use carbon dioxide during photosynthesis.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Chemistry', 'The smallest unit of an element is an:', '["atom", "cell", "molecule only", "compound"]'::jsonb, 'atom', 'An atom is the smallest unit of an element.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'Which part of the plant makes food?', '["Root", "Leaf", "Stem", "Flower"]'::jsonb, 'Leaf', 'Leaves make food through photosynthesis.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'DNA is mainly found in the:', '["Nucleus", "Cell wall", "Ribosome", "Cytoplasm only"]'::jsonb, 'Nucleus', 'DNA is mainly stored in the nucleus.', 'Medium', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'Which organ pumps blood?', '["Lungs", "Heart", "Kidney", "Stomach"]'::jsonb, 'Heart', 'The heart pumps blood around the body.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'Humans breathe in mainly:', '["oxygen", "carbon dioxide", "helium", "neon"]'::jsonb, 'oxygen', 'Humans need oxygen for respiration.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'The basic unit of life is the:', '["atom", "cell", "organ", "tissue"]'::jsonb, 'cell', 'Cells are the basic units of life.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'Which system controls body activities using brain and nerves?', '["Digestive", "Nervous", "Respiratory", "Skeletal"]'::jsonb, 'Nervous', 'The nervous system includes brain and nerves.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'Which blood cells help fight infection?', '["Red blood cells", "White blood cells", "Platelets", "Plasma only"]'::jsonb, 'White blood cells', 'White blood cells fight infection.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'Photosynthesis mainly produces:', '["glucose and oxygen", "salt and water", "protein only", "nitrogen"]'::jsonb, 'glucose and oxygen', 'Photosynthesis produces glucose and oxygen.', 'Medium', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'Which organ filters blood and makes urine?', '["Heart", "Kidney", "Liver", "Lung"]'::jsonb, 'Kidney', 'Kidneys filter blood and produce urine.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'The process of taking in oxygen and releasing carbon dioxide is:', '["digestion", "respiration", "circulation", "excretion"]'::jsonb, 'respiration', 'Respiration involves gas exchange and energy release.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'Which nutrient helps build body tissues?', '["Protein", "Water", "Fiber only", "Salt"]'::jsonb, 'Protein', 'Proteins help build and repair body tissues.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('Biology', 'Which part of a cell controls most activities?', '["Nucleus", "Cell wall", "Vacuole only", "Membrane only"]'::jsonb, 'Nucleus', 'The nucleus controls cell activities.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'Choose the correct sentence.', '["He go to school.", "He goes to school.", "He going to school.", "He gone to school."]'::jsonb, 'He goes to school.', 'For third-person singular, use goes.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'What is the opposite of “difficult”?', '["Hard", "Easy", "Heavy", "Strong"]'::jsonb, 'Easy', 'Easy is the opposite of difficult.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'Choose the correct plural of “child”.', '["childs", "children", "childes", "childrens"]'::jsonb, 'children', 'The plural of child is children.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'Fill in the blank: She ___ reading a book.', '["am", "is", "are", "be"]'::jsonb, 'is', 'She is reading a book.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'Which word is an adjective?', '["quickly", "beautiful", "run", "they"]'::jsonb, 'beautiful', 'Beautiful describes a noun.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'Choose the past tense of “go”.', '["goed", "goes", "went", "gone"]'::jsonb, 'went', 'The past tense of go is went.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'Which is a synonym of “happy”?', '["sad", "angry", "glad", "tired"]'::jsonb, 'glad', 'Glad means happy.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'Choose the correct article: ___ apple', '["a", "an", "the only", "no article"]'::jsonb, 'an', 'Use an before a vowel sound.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'What is the opposite of “increase”?', '["grow", "rise", "decrease", "improve"]'::jsonb, 'decrease', 'Decrease means become less.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'Choose the correct word: I have ___ umbrella.', '["a", "an", "the a", "no"]'::jsonb, 'an', 'Umbrella begins with a vowel sound.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'Which sentence is in future tense?', '["I eat rice.", "I ate rice.", "I will eat rice.", "I am eating rice."]'::jsonb, 'I will eat rice.', 'Will shows future tense.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('English', 'What is the meaning of “important”?', '["not useful", "very useful or serious", "small only", "late"]'::jsonb, 'very useful or serious', 'Important means something has value or seriousness.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'Which planet is known as the Red Planet?', '["Earth", "Mars", "Venus", "Jupiter"]'::jsonb, 'Mars', 'Mars is called the Red Planet.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'How many days are in a leap year?', '["364", "365", "366", "367"]'::jsonb, '366', 'A leap year has 366 days.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'Which direction does the sun rise from?', '["West", "North", "East", "South"]'::jsonb, 'East', 'The sun rises in the east.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'How many continents are commonly counted in the world?', '["5", "6", "7", "8"]'::jsonb, '7', 'The common school model counts seven continents.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'Which is the largest ocean?', '["Atlantic", "Indian", "Pacific", "Arctic"]'::jsonb, 'Pacific', 'The Pacific Ocean is the largest.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'A map is used to show:', '["music", "places", "taste", "temperature only"]'::jsonb, 'places', 'Maps show locations and places.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'Which of these is a natural source of light?', '["Candle", "Bulb", "Sun", "Torch"]'::jsonb, 'Sun', 'The sun is a natural light source.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'How many hours are in one day?', '["12", "18", "24", "30"]'::jsonb, '24', 'One day has 24 hours.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'Which month usually has 28 days?', '["January", "February", "March", "May"]'::jsonb, 'February', 'February usually has 28 days.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'Which tool is used to measure direction?', '["Compass", "Thermometer", "Scale", "Clock"]'::jsonb, 'Compass', 'A compass shows direction.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'Which is used to tell time?', '["Clock", "Map", "Book", "Ruler"]'::jsonb, 'Clock', 'A clock tells time.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published'),
('General Knowledge', 'Which is the closest star to Earth?', '["Moon", "Sun", "Mars", "Venus"]'::jsonb, 'Sun', 'The Sun is the closest star to Earth.', 'Easy', 'English', 'KEP v5.1.1 demo', 'KEP v5.1.1 demo content for testing only', 'published');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from public.resources
    where source_type = 'KEP v5.1.1 demo'
    limit 1
  ) then
    insert into public.resources
    (title, resource_type, subject_name, language, grade, year, file_url, source_type, source_details, status)
    values
    ('KEP v5.1.1 Mathematics Starter Notes', 'Book / Notes', 'Mathematics', 'English', 'Grade 12', '2026', 'https://example.com/kep-mathematics-notes.pdf', 'KEP v5.1.1 demo', 'Testing only placeholder link', 'published'),
('KEP v5.1.1 Physics Starter Notes', 'Book / Notes', 'Physics', 'English', 'Grade 12', '2026', 'https://example.com/kep-physics-notes.pdf', 'KEP v5.1.1 demo', 'Testing only placeholder link', 'published'),
('KEP v5.1.1 Chemistry Starter Notes', 'Book / Notes', 'Chemistry', 'English', 'Grade 12', '2026', 'https://example.com/kep-chemistry-notes.pdf', 'KEP v5.1.1 demo', 'Testing only placeholder link', 'published'),
('KEP v5.1.1 Biology Starter Notes', 'Book / Notes', 'Biology', 'English', 'Grade 12', '2026', 'https://example.com/kep-biology-notes.pdf', 'KEP v5.1.1 demo', 'Testing only placeholder link', 'published'),
('KEP v5.1.1 English Starter Notes', 'Book / Notes', 'English', 'English', 'Grade 12', '2026', 'https://example.com/kep-english-notes.pdf', 'KEP v5.1.1 demo', 'Testing only placeholder link', 'published'),
('KEP v5.1.1 General Knowledge Starter Notes', 'Book / Notes', 'General Knowledge', 'English', 'Grade 12', '2026', 'https://example.com/kep-general-knowledge-notes.pdf', 'KEP v5.1.1 demo', 'Testing only placeholder link', 'published');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from public.exam_templates
    where source_note = 'KEP v5.1.1 demo content'
    limit 1
  ) then
    insert into public.exam_templates
    (name, description, time_minutes, verification_status, distribution, source_note, status)
    values
    ('KEP v5.1.1 Balanced 30 Demo Mock', 'Balanced 30-question demo mock for testing KEP only.', 30, 'Practice template', '[{"subject":"Mathematics","count":5},{"subject":"Physics","count":5},{"subject":"Chemistry","count":5},{"subject":"Biology","count":5},{"subject":"English","count":5},{"subject":"General Knowledge","count":5}]'::jsonb, 'KEP v5.1.1 demo content', 'published'),
    ('KEP v5.1.1 Quick 10 Demo Mock', 'Quick 10-question demo mock for checking the student journey.', 10, 'Practice template', '[{"subject":"Mathematics","count":2},{"subject":"Physics","count":2},{"subject":"Chemistry","count":2},{"subject":"Biology","count":2},{"subject":"English","count":1},{"subject":"General Knowledge","count":1}]'::jsonb, 'KEP v5.1.1 demo content', 'published');
  end if;
end $$;

-- ============================================================
-- Strings Guitar Learning Platform — Seed Data
-- Run AFTER schema.sql in your Supabase SQL editor
-- ============================================================

-- ============================================================
-- CURRICULUM LEVELS
-- ============================================================
insert into public.curriculum_levels (id, slug, name, description, order_index) values
  ('00000000-0000-0000-0000-000000000001', 'beginner',     'Beginner',     'No experience needed. Learn the fundamentals, open chords, and your first songs.',         1),
  ('00000000-0000-0000-0000-000000000002', 'intermediate', 'Intermediate', 'You know the basics. Dive into barre chords, scales, blues, and music theory.',            2),
  ('00000000-0000-0000-0000-000000000003', 'advanced',     'Advanced',     'You''re fluent. Master jazz voicings, modes, extended techniques, and composition.',        3);

-- ============================================================
-- BEGINNER CHAPTERS & LESSONS
-- ============================================================
insert into public.chapters (id, level_id, title, description, order_index, estimated_minutes, is_premium) values
  ('b1000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Getting Started: Fundamentals & Setup',           'Learn guitar anatomy, proper posture, and foundational technique.',                      1, 90,  false),
  ('b1000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Essential Open Chords (Part 1)',                   'Master Em, Am, G, and D — four chords that power hundreds of songs.',                    2, 130, false),
  ('b1000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Essential Open Chords (Part 2) & Transitions',    'Complete the open chord set and practice smooth chord changes.',                         3, 130, true),
  ('b1000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Basic Strumming Patterns',                        'Learn fundamental rhythmic patterns, pick technique, and keeping time.',                  4, 110, true),
  ('b1000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'First Songs & Playing Along',                     'Apply what you''ve learned to real songs using the chords and strumming you know.',      5, 150, true),
  ('b1000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', 'Introduction to Fingerpicking',                   'Transition from strumming to individual string playing for a new sonic dimension.',     6, 135, true),
  ('b1000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001', 'Music Theory Basics',                             'Build the vocabulary to understand what you''re playing and why it works.',              7, 135, true),
  ('b1000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000001', 'Building Your Practice Routine',                  'Establish consistent habits, troubleshoot problems, and grow your repertoire.',          8, 90,  true);

-- Chapter 1 lessons
insert into public.lessons (id, chapter_id, title, description, order_index, type, content, target_chord, target_finger_positions, accuracy_threshold, estimated_minutes, is_premium) values
  ('b1c10000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Guitar Anatomy & Parts',
   'Headstock, tuning pegs, frets, bridge, body, nut — every part and what it does.',
   1, 'theory',
   '{"intro":"Before you play a note, know your instrument. This lesson covers every part of the guitar and how it affects your sound.","steps":[{"title":"The Headstock & Tuning Pegs","body":"At the top of the neck. Turn the pegs to raise or lower string pitch. Tighten = higher pitch, loosen = lower pitch."},{"title":"The Nut","body":"Small grooved piece between headstock and fretboard. It spaces the strings and sets their height at that end."},{"title":"The Neck & Fretboard","body":"The long piece with metal frets. Your fretting hand lives here. The fretboard has dots at frets 3, 5, 7, 9, 12 as position markers."},{"title":"The Body","body":"The large resonating chamber. Acoustic guitars amplify sound through the soundhole. Electric guitars use pickups."},{"title":"The Bridge & Saddle","body":"Anchors the strings at the body end. The saddle (like the nut) sets string height. Adjustable on electric guitars."},{"title":"The Soundhole (Acoustic)","body":"Where the sound projects from. The rounder the guitar body, the more bass resonance."}],"tips":["Take a photo of your guitar and label each part from memory","Ask yourself: what happens if I loosen all the tuning pegs?"]}',
   null, null, 0, 15, false),

  ('b1c10000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Proper Posture & Holding the Guitar',
   'Sitting and standing positions that prevent injury and set you up for fast progress.',
   2, 'theory',
   '{"intro":"Good posture is not optional — it prevents tendonitis, speeds up learning, and makes you look like you know what you''re doing.","steps":[{"title":"Sitting Position (Classical)","body":"Rest the guitar on your left leg, neck pointing up at 45°. Keep your back straight. This is the most stable learning position."},{"title":"Sitting Position (Casual)","body":"Guitar rests on your right leg, neck pointing slightly upward. Most guitarists learn this way. Keep the guitar body against your stomach."},{"title":"Fretting Hand","body":"Thumb behind the neck, roughly opposite your middle finger. Fingers curved like holding a ball. Never let your thumb drape over the top — it limits your reach."},{"title":"Picking/Strumming Hand","body":"Relaxed wrist, hovering over the soundhole. Movement comes from the wrist, not the elbow. Don''t tense up."},{"title":"Standing Position","body":"Use a strap adjusted so the guitar sits at the same height as when seated. Drop it too low and barre chords become very hard."}],"tips":["Record yourself from the side to check posture","If your wrist hurts after 10 minutes, your thumb is probably behind the wrong place on the neck"]}',
   null, null, 0, 20, false),

  ('b1c10000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', 'Tuning Your Guitar',
   'Standard EADGBE tuning — using a tuner, using your ear, and why it matters so much.',
   3, 'tuning',
   '{"intro":"An out-of-tune guitar sounds bad no matter how well you play. Tune every single time you pick up the instrument.","steps":[{"title":"Standard Tuning: EADGBE","body":"From thickest to thinnest string: E (low) – A – D – G – B – E (high). Remember: Every Acid Drop Gets Better Eventually."},{"title":"Using the Built-In Tuner","body":"Enable the tuner in this app. Pluck each string one at a time. The needle shows whether you''re flat (below pitch) or sharp (above). Tune up from below pitch — this keeps the string under tension and holds tune better."},{"title":"Relative Tuning (by ear)","body":"Fret 5th fret of low E → should match open A. Fret 5th fret of A → should match open D. Fret 5th fret of D → matches open G. Fret 4th fret of G → matches open B. Fret 5th fret of B → matches open high e."},{"title":"Why Tuning Matters","body":"Every chord shape on this platform assumes standard tuning. If one string is off, every chord sounds wrong even with perfect finger placement."}],"tips":["Tune up to pitch, never down — strings hold tension better when tuned upward","Tune before every practice session, even short ones"]}',
   null, null, 0, 15, false),

  ('b1c10000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000001', 'Finger Numbering & Fretboard Basics',
   'The numbering system used in every chord diagram, plus your first notes on the fretboard.',
   4, 'theory',
   '{"intro":"Chord diagrams use a universal numbering system. Learn it once and you''ll instantly read any diagram in any book.","steps":[{"title":"Finger Numbers","body":"Index = 1, Middle = 2, Ring = 3, Pinky = 4, Thumb = T. When a chord diagram says place finger 1 on string 2 fret 1, that means your index finger."},{"title":"String Numbers","body":"String 1 = thinnest (high e). String 6 = thickest (low E). This feels backward at first — just remember thin = 1."},{"title":"Fret Numbers","body":"Count from the nut (fret 0 = open). Fret 1 is the space between the nut and first metal bar. Higher fret = higher pitch."},{"title":"Your First Note: A on String 3","body":"Place finger 2 on string 3, fret 2. Pluck just that string. That''s the note B. Now try all six open strings, naming each one: E A D G B e."}],"tips":["The dots on the fretboard at frets 3, 5, 7, 9, 12 are position markers — they help you navigate without counting","Fret 12 is the same note as the open string, one octave higher"]}',
   null, null, 0, 20, false),

  ('b1c10000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000001', 'Callus Development & Hand Conditioning',
   'The truth about finger pain, how long it lasts, and exercises that speed it up.',
   5, 'exercise',
   '{"intro":"Your fingertips will hurt for 2–4 weeks. This is normal and temporary. Calluses form where skin repeatedly contacts the frets. Here''s how to build them efficiently.","steps":[{"title":"Why It Hurts","body":"Steel strings press into soft skin. Your body responds by hardening the skin at contact points. This takes about 2–4 weeks of consistent daily playing."},{"title":"The Spider Exercise","body":"Place finger 1 on string 6 fret 1, finger 2 on string 5 fret 1, finger 3 on string 4 fret 1, finger 4 on string 3 fret 1. Move each finger to fret 2, maintaining contact. This builds independence and calluses simultaneously."},{"title":"One-Finger Press","body":"Press any string against any fret firmly enough to produce a clear tone when plucked. Hold 5 seconds. Release. Repeat 10× per fingertip."},{"title":"What NOT to Do","body":"Don''t use numbing creams — you need the feedback. Don''t play for hours in one session — 15 minutes daily beats 2 hours once a week for callus formation."}],"tips":["Dipping fingertips in rubbing alcohol for 30 seconds after playing slightly accelerates hardening","If pain is sharp or in the joint (not the tip) — stop and rest"]}',
   null, null, 0, 10, false);

-- Chapter 2 lessons
insert into public.lessons (id, chapter_id, title, description, order_index, type, content, target_chord, target_finger_positions, accuracy_threshold, estimated_minutes, is_premium) values
  ('b1c20000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'Understanding Chord Diagrams',
   'How to read chord charts, what X and O mean, and how to translate diagram to hand.',
   1, 'theory',
   '{"intro":"Every chord in this course is shown as a diagram. This lesson teaches you to read them fluently.","steps":[{"title":"The Grid","body":"Vertical lines = strings (left = thickest = string 6). Horizontal lines = frets. The thick line at top = nut (you''re at the open position)."},{"title":"Dots","body":"Dots show where to place your fingers. The number inside the dot = finger number (1=index, 2=middle, 3=ring, 4=pinky)."},{"title":"X and O","body":"X above a string = mute this string (don''t play it). O above a string = play it open (no finger needed)."},{"title":"Reading Em","body":"Em has two dots: finger 2 on string 5 fret 2, finger 3 on string 4 fret 2. Strings 1, 2, 3, 6 are open. No X — play all six strings."}],"tips":["Print or screenshot chord diagrams before each lesson to reference while practicing","If a diagram has a number beside it (like 5fr), that means the nut line represents fret 5, not fret 1"]}',
   null, null, 0, 20, false),

  ('b1c20000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002', 'Em (E Minor) Chord',
   'Your first chord. Two fingers, all six strings, beautiful minor sound.',
   2, 'chord',
   '{"intro":"Em is the perfect first chord. Only two fingers, you play all six strings, and it sounds great immediately.","steps":[{"title":"Finger Placement","body":"Place finger 2 (middle) on string 5, fret 2. Place finger 3 (ring) on string 4, fret 2. Both fingers should be close to the fret wire — not in the middle of the fret space."},{"title":"Press and Check","body":"Press down firmly. Strum all six strings slowly. Each string should ring clearly with no buzzing. If a string buzzes, your finger is too far from the fret or not pressing hard enough."},{"title":"The Sound","body":"Em sounds melancholic, contemplative. It''s in hundreds of songs — House of the Rising Sun, Stairway to Heaven, Nothing Else Matters."},{"title":"The Challenge","body":"Beginner fingers sometimes mute string 3 with finger 3 accidentally. Curve your fingers — the tip should contact the string, not the pad."}],"tips":["Spend 5 minutes just pressing and releasing Em repeatedly — building the muscle memory","Say out loud as you place each finger: ''middle finger string 5 fret 2, ring finger string 4 fret 2''"]}',
   'Em', '[{"string":5,"fret":2,"finger":2},{"string":4,"fret":2,"finger":3}]', 75, 25, false),

  ('b1c20000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000002', 'Am (A Minor) Chord',
   'Three fingers now, but the shape will become second nature faster than you think.',
   3, 'chord',
   '{"intro":"Am is Em''s cousin — slightly more complex but immediately satisfying. Together, Am and Em form the backbone of minor key songs.","steps":[{"title":"Finger Placement","body":"Finger 1 (index) on string 2, fret 1. Finger 2 (middle) on string 4, fret 2. Finger 3 (ring) on string 3, fret 2. Mute string 6 (X) — don''t play the low E."},{"title":"The X String","body":"Rest your thumb gently on string 6 to mute it, or simply strum from string 5 downward. Most beginners strum from string 5 — this is fine."},{"title":"Clear Each String","body":"Pluck strings 1-5 one at a time. Each should ring cleanly. If string 2 buzzes, your index finger may be touching it accidentally — curve it more."},{"title":"Am vs Em","body":"Em: both fingers on middle strings, fret 2. Am: three fingers spread across frets 1 and 2. The shapes look different but your hand learns them as muscle memory, not conscious thought."}],"tips":["Practice the transition: place Em → lift all fingers → place Am. Aim for 4 changes per minute first.","The Am-G-F-E progression is one of the most common in rock — you already know two of those chords"]}',
   'Am', '[{"string":2,"fret":1,"finger":1},{"string":4,"fret":2,"finger":2},{"string":3,"fret":2,"finger":3},{"string":6,"fret":0,"finger":0,"muted":true}]', 75, 25, false),

  ('b1c20000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000002', 'G Chord',
   'A full open chord that tests your finger stretch and sounds massive.',
   4, 'chord',
   '{"intro":"G major is one of the most-used chords in all of popular music. It takes a few days to get clean, but once it clicks, it stays.","steps":[{"title":"Classic 4-Finger G Shape","body":"Finger 2 on string 6 fret 3. Finger 1 on string 5 fret 2. Finger 3 on string 2 fret 3. Finger 4 on string 1 fret 3. Strum all six strings."},{"title":"3-Finger Variation","body":"Finger 1 on string 5 fret 2. Finger 2 on string 6 fret 3. Finger 3 on string 1 fret 3. Strings 2, 3, 4 open. This is easier and works for most songs."},{"title":"Why G is Hard","body":"It requires simultaneous placement across 6 frets of distance. Your ring and pinky aren''t used to working this way yet. That''s completely normal."},{"title":"Check for Buzzing","body":"Strum string 6 alone, then string 5, then listen through all strings. G should ring with fullness — all six strings contributing."}],"tips":["Learn the 3-finger version first, graduate to 4-finger after a week","G → D is one of the most common chord changes in folk/pop — practice that pair obsessively"]}',
   'G', '[{"string":6,"fret":3,"finger":2},{"string":5,"fret":2,"finger":1},{"string":2,"fret":3,"finger":3},{"string":1,"fret":3,"finger":4}]', 75, 30, false),

  ('b1c20000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000002', 'D Chord',
   'A bright, clean major chord with a distinctive triangular finger shape.',
   5, 'chord',
   '{"intro":"D major is bright and resonant. Its three-finger triangular shape is memorable once you see it, and it''s the gateway to songs in D, G, and A major.","steps":[{"title":"Finger Placement","body":"Finger 1 on string 3 fret 2. Finger 2 on string 1 fret 2. Finger 3 on string 2 fret 3. Strings 4 is open; strings 5 and 6 are not played (X)."},{"title":"String Selection","body":"D only uses strings 1-4. Strum from string 4 downward. Accidentally hitting strings 5 or 6 will sound muddy — practice your strumming aim."},{"title":"The Triangle","body":"Look at your fretting hand from above — your three fingers form a triangle. This visual is helpful for remembering the shape."},{"title":"Common Issues","body":"Finger 3 often accidentally mutes string 1 — make sure its tip is pressed, not its flat side. Keep all fingers curved."}],"tips":["D → A → G is a major-key progression in dozens of country and pop songs","D → Em transition is easier than it looks — try it slowly"]}',
   'D', '[{"string":3,"fret":2,"finger":1},{"string":1,"fret":2,"finger":2},{"string":2,"fret":3,"finger":3},{"string":5,"fret":0,"finger":0,"muted":true},{"string":6,"fret":0,"finger":0,"muted":true}]', 75, 30, false);

-- Chapter 3 lessons
insert into public.lessons (id, chapter_id, title, description, order_index, type, content, target_chord, target_finger_positions, accuracy_threshold, estimated_minutes, is_premium) values
  ('b1c30000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', 'C Chord (Simplified)',
   'A two-finger simplified C to get you playing C-based songs before tackling the full shape.',
   1, 'chord',
   '{"intro":"The full C chord can be frustrating early on. This simplified version lets you play songs while your hand strength develops.","steps":[{"title":"Two-Finger C","body":"Finger 2 on string 4 fret 2. Finger 1 on string 2 fret 1. Strum strings 1-4 only. This gives you a Cadd9-like sound that works in most beginner songs."},{"title":"When to Use It","body":"Any song calling for a C chord. Most pop and folk songs won''t notice the difference. Once C feels natural, upgrade to the full version."},{"title":"Check Your Sound","body":"String 1 (high e) should ring open and clear. String 3 (G) should ring open. Strings 2 and 4 should ring clearly where your fingers are placed."}],"tips":["This is a training chord — treat it as a stepping stone","The simplified C to G change is very fast once you have it"]}',
   'C', '[{"string":4,"fret":2,"finger":2},{"string":2,"fret":1,"finger":1},{"string":5,"fret":0,"finger":0,"muted":true},{"string":6,"fret":0,"finger":0,"muted":true}]', 70, 20, true),

  ('b1c30000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000003', 'Full C Chord',
   'The complete three-finger C chord — one of the most important chords in music.',
   2, 'chord',
   '{"intro":"Full C major is the chord that separates beginners from early intermediate players. It takes time. Be patient.","steps":[{"title":"Finger Placement","body":"Finger 3 on string 5 fret 3. Finger 2 on string 4 fret 2. Finger 1 on string 2 fret 1. String 1 open. String 6 muted (X)."},{"title":"The Stretch","body":"Your fingers span three frets diagonally. The key is keeping all three fingertips close to the fret wire, curved, and pressing straight down."},{"title":"The Notorious Buzz","body":"String 3 buzzes for almost every beginner on C. It''s between fingers 1 and 2. Make sure finger 1 isn''t leaning into string 3. Curve it."},{"title":"Test Note by Note","body":"Pluck each string from 5 down to 1. Every note should ring without buzzing. If string 3 buzzes, adjust finger 1. If string 5 buzzes, adjust finger 3."}],"tips":["C is the most complained-about beginner chord — you are not alone","The C-G change is worth practicing 100 times in a row until it''s automatic"]}',
   'C', '[{"string":5,"fret":3,"finger":3},{"string":4,"fret":2,"finger":2},{"string":2,"fret":1,"finger":1},{"string":6,"fret":0,"finger":0,"muted":true}]', 75, 30, true),

  ('b1c30000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000003', 'A Major Chord',
   'Three fingers squeezed into fret 2 — a common shape used in every genre.',
   3, 'chord',
   '{"intro":"A major has a sunny, bright sound. Three fingers crowd into the same fret, which feels weird at first but becomes natural quickly.","steps":[{"title":"Three Versions","body":"Version 1 (classic): Fingers 1-2-3 on strings 4-3-2, all fret 2. Version 2: Bar all three strings with finger 1. Version 3: Fingers 2-3-4 on strings 4-3-2 fret 2 (leaves index free for transitions)."},{"title":"Which Version to Use","body":"Start with version 1. Switch to version 3 once you learn more chords — having the index free speeds up transitions significantly."},{"title":"Open Strings","body":"String 5 is open (A note — the root). String 1 is open. String 6 is muted."},{"title":"The Squeeze","body":"Three fingers in the same fret requires them to angle slightly, not stand perpendicular. This is normal. They''ll find their natural spacing."}],"tips":["A → D → E is the most common progression in rock/blues — once you have all three, you can play I Love Rock and Roll","A is the movable shape for barre chords later"]}',
   'A', '[{"string":4,"fret":2,"finger":1},{"string":3,"fret":2,"finger":2},{"string":2,"fret":2,"finger":3},{"string":6,"fret":0,"finger":0,"muted":true}]', 75, 30, true),

  ('b1c30000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000003', 'E Major Chord',
   'The full, resonant E chord and its sibling E7.',
   4, 'chord',
   '{"intro":"E major is rich and full. It uses all six strings and its shape is the foundation of all E-form barre chords you''ll learn later.","steps":[{"title":"E Major Shape","body":"Finger 1 on string 3 fret 1. Finger 2 on string 5 fret 2. Finger 3 on string 4 fret 2. All six strings played open or fretted."},{"title":"The Relationship to Em","body":"Compare E and Em — they''re nearly identical. Em uses fingers 2 and 3 only. E major adds finger 1 on string 3 fret 1. The minor/major difference is that single added note."},{"title":"E7 Variation","body":"Remove finger 3 from E major (string 4). You now have E7 — a bluesy dominant seventh chord. E7 appears in blues and rock transitions."},{"title":"Full Ring","body":"E is one of the few open chords that fully resonates on all 6 strings. Strum slowly and listen to the overtones — this is what a guitar is made for."}],"tips":["E → A → D is a common I-IV-V in the key of A — try it now","E7 followed by Am creates a powerful tension-and-release movement"]}',
   'E', '[{"string":3,"fret":1,"finger":1},{"string":5,"fret":2,"finger":2},{"string":4,"fret":2,"finger":3}]', 75, 25, true),

  ('b1c30000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000003', 'Smooth Chord Transitions',
   'Building the muscle memory and speed for seamless chord changes.',
   5, 'exercise',
   '{"intro":"Knowing a chord and being able to change to it are two different skills. This lesson builds the second skill — the one that actually matters when playing music.","steps":[{"title":"One Minute Changes","body":"Set a 1-minute timer. Switch between two chords as many times as possible. Count. Beat your score tomorrow. Target: 60 changes per minute before moving on."},{"title":"Anchor Fingers","body":"When changing between chords that share a finger position, don''t lift that finger — slide it into place. G → Cadd9 shares finger 3 on string 2. Em → Am shares finger 2 (roughly)."},{"title":"Practice These Pairs","body":"Em → Am (essential for minor songs). G → D (folk/pop staple). G → C (90% of popular music). D → A (country/rock). C → Am (classic progression)."},{"title":"The Slow-Mo Technique","body":"Play chord A. Pause. Visualize chord B completely. Then place it. Gradually reduce the pause until there''s none. Your brain needs to pre-plan the shape before the change."}],"tips":["Bad transitions ruin good songs. Good transitions make mediocre playing sound professional.","Practice the chord you''re going TO, not away FROM — always look ahead"]}',
   null, null, 70, 40, true);

-- ============================================================
-- INTERMEDIATE CHAPTERS (abbreviated for space — key ones)
-- ============================================================
insert into public.chapters (id, level_id, title, description, order_index, estimated_minutes, is_premium) values
  ('e1000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'Barre Chords & Movable Shapes',     'Master the technique that unlocks every key on the fretboard.',     1, 175, true),
  ('e1000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Power Chords & Rock Techniques',    'Foundational rock and metal guitar vocabulary.',                   2, 150, true),
  ('e1000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Advanced Strumming & Rhythm',       'Syncopation, swing, funk, and odd time signatures.',                3, 170, true),
  ('e1000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'Scales & Fretboard Mastery',        'CAGED system, pentatonics, and blues scale with bends.',            4, 190, true),
  ('e1000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'Chord Progression Harmony',        'Roman numeral analysis, 7th chords, and substitutions.',           5, 160, true),
  ('e1000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', 'Fingerpicking Mastery',             'Travis picking, percussive fingerstyle, and original patterns.',    6, 185, true),
  ('e1000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000002', 'Music Theory Expansion',           'Modes, intervals, ear training, secondary dominants.',              7, 165, true),
  ('e1000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000002', 'Blues Guitar Fundamentals',        '12-bar blues, soloing, licks, and phrasing.',                       8, 170, true),
  ('e1000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000002', 'Folk, Fingerstyle & Acoustic',      'Open tunings, capo, folk arrangements, interpretation.',            9, 165, true),
  ('e1000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', 'Rhythm, Improv & Style',           'Improvisation framework, jazz comping basics, finding your voice.', 10, 175, true);

-- Barre chord chapter lessons
insert into public.lessons (id, chapter_id, title, description, order_index, type, content, target_chord, target_finger_positions, accuracy_threshold, estimated_minutes, is_premium) values
  ('e1c10000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'Barre Chord Fundamentals',
   'Understanding movable shapes — what a barre chord is and why it matters.',
   1, 'theory',
   '{"intro":"A barre chord uses your index finger to press all strings at one fret, acting like a movable nut. This single technique lets you play any chord in any key anywhere on the neck.","steps":[{"title":"What Is a Barre?","body":"Place your index finger flat across all six strings at fret 2. Press firmly. Strum. Every string should ring. This is the barre technique."},{"title":"Why It''s Hard","body":"Your index finger isn''t designed to press six strings simultaneously. The tendons and muscles need weeks of conditioning. Expect buzzing. Expect soreness. This is normal."},{"title":"The Physics","body":"The closer your finger is to the fret wire, the less pressure needed for a clean sound. Position your index finger immediately behind the fret, not in the middle of the space."},{"title":"Finger Angle","body":"Rotating your index finger slightly so the bony edge (not the flat pad) contacts the strings makes a cleaner barre. Try rolling it slightly toward the headstock."}],"tips":["F chord is the most complained-about barre chord in history. You are in good company.","Strength comes from technique, not force — pressing harder rarely fixes buzzing"]}',
   null, null, 0, 30, true),

  ('e1c10000-0000-0000-0000-000000000002', 'e1000000-0000-0000-0000-000000000001', 'F Major Barre Chord',
   'The first barre chord. The one everyone struggles with. The one that changes everything.',
   2, 'chord',
   '{"intro":"F is the notorious first barre chord. Most guitarists hit a wall here. Push through it — the breakthrough is one of the most satisfying moments in learning guitar.","steps":[{"title":"The Shape","body":"Index finger barres all 6 strings at fret 1. Ring finger on string 5 fret 3. Middle finger on string 3 fret 2. Pinky on string 4 fret 3."},{"title":"Build It Piece by Piece","body":"First, place just the barre. Check each string rings. Then add the ring finger on string 5. Add pinky on string 4. Finally add middle finger on string 3."},{"title":"The Most Common Buzzes","body":"String 2 (B): your index finger joint often falls exactly here. Adjust position. String 1 (e): your index tip may not be reaching. Extend it further."},{"title":"Half-Barre Option","body":"If full F is too hard, try the 4-string mini-F: finger 1 bars strings 1-2 at fret 1, finger 2 on string 3 fret 2, finger 3 on string 4 fret 3. This works for most pop songs."}],"tips":["Practice barring just strings 1-2 with your index before attempting all 6","The F chord gets easier every single day — track your improvement"]}',
   'F', '[{"string":6,"fret":1,"finger":1},{"string":5,"fret":1,"finger":1},{"string":4,"fret":3,"finger":4},{"string":3,"fret":2,"finger":2},{"string":2,"fret":1,"finger":1},{"string":1,"fret":1,"finger":1}]', 80, 40, true),

  ('e1c10000-0000-0000-0000-000000000003', 'e1000000-0000-0000-0000-000000000001', 'Bm Barre Chord',
   'The A-form barre chord at fret 2 — easier than F, equally important.',
   3, 'chord',
   '{"intro":"Bm uses the A chord shape barred at fret 2. Many players find this easier than F because the barre only needs to cover strings 1-5.","steps":[{"title":"A-Form Shape","body":"Index finger bars strings 1-5 at fret 2. Ring finger on string 4 fret 4. Middle finger on string 3 fret 3. Pinky on string 2 fret 4. String 6 muted."},{"title":"The Partial Barre","body":"You only need to barre strings 1-5 at fret 2, not all 6. String 6 is muted. This reduces the pressure required substantially compared to E-form (F)."},{"title":"Movable Logic","body":"The same shape at fret 3 = Cm. At fret 5 = Dm. At fret 7 = Em. You''ve just unlocked every minor chord on the neck in one shape."},{"title":"Common Bm Songs","body":"Bm appears in Bob Dylan''s The Times They Are A-Changin, Taylor Swift''s Love Story, and countless folk and country songs. It''s an essential chord."}],"tips":["Bm → A → G → E is a classic minor progression — practice it once you have all four","The A-form barre is often easier to land quickly than the E-form — use it for fast transitions"]}',
   'Bm', '[{"string":5,"fret":2,"finger":1},{"string":4,"fret":4,"finger":3},{"string":3,"fret":3,"finger":2},{"string":2,"fret":4,"finger":4},{"string":1,"fret":2,"finger":1},{"string":6,"fret":0,"finger":0,"muted":true}]', 80, 30, true),

  ('e1c10000-0000-0000-0000-000000000004', 'e1000000-0000-0000-0000-000000000001', 'Movable Major Shapes (E & A Forms)',
   'Using the E and A open shapes as movable templates across the entire neck.',
   4, 'theory',
   '{"intro":"The CAGED system shows that every open chord is just a movable shape. Master two shapes and you can play any major chord anywhere.","steps":[{"title":"E-Form Movable Shapes","body":"The E chord shape (Em or E) barred at any fret = a major/minor chord at that root. E barred at fret 3 = G major. E barred at fret 5 = A major. Fret 7 = B major."},{"title":"A-Form Movable Shapes","body":"The A chord shape barred at any fret = major/minor chords. A barred at fret 2 = B major. Fret 3 = C. Fret 5 = D. Fret 7 = E."},{"title":"Finding Your Root","body":"For E-form: the root note is on string 6 (the barred fret). For A-form: root is on string 5. Use the chromatic scale to find any chord: E-F-F#-G-G#-A-A#-B-C-C#-D-D#-E."},{"title":"Practical Application","body":"Play G major three ways: open position, E-form at fret 3, A-form at fret 10. They all sound like G. Different voicings, different tonal character."}],"tips":["You now have the power to play in any key without learning new shapes","Barre chord fingering tip: try not to think of it as hard — think of it as ''pressing E shape higher on the neck''"]}',
   null, null, 0, 40, true);

-- ============================================================
-- ADVANCED CHAPTERS (abbreviated key chapters)
-- ============================================================
insert into public.chapters (id, level_id, title, description, order_index, estimated_minutes, is_premium) values
  ('a1000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'Modal Mastery & Advanced Harmony',  'Modal interchange, harmonic/melodic minor, symmetric scales.',      1, 215, true),
  ('a1000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'Jazz Guitar Fundamentals',          'Extended voicings, comping, ii-V-I, bebop language.',               2, 230, true),
  ('a1000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'Advanced Lead & Soloing',           'Legato, advanced bends, tapping, sweep picking, phrasing.',         3, 210, true),
  ('a1000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000003', 'Classical Guitar & Notation',       'Classical technique, standard notation, transcription, arrangement.',4, 220, true),
  ('a1000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000003', 'Extended Techniques & Sound Design','Harmonics, slides, alternate tunings, effects and signal chain.',    5, 185, true),
  ('a1000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000003', 'Composition & Songwriting',         'Melody, harmony, structure, arrangement, creating original music.',  6, 220, true),
  ('a1000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000003', 'Genre Mastery',                     'Rock/metal, country, funk, blues-rock fusion, progressive styles.',  7, 235, true),
  ('a1000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000003', 'Performance & Interpretation',      'Stage presence, ensemble playing, sight-reading, recording.',       8, 200, true),
  ('a1000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000003', 'Lifelong Learning & Mastery',       'Ear training mastery, transcription, teaching, musical vision.',    9, 220, true);

-- ============================================================
-- SONGS (Public Domain)
-- ============================================================
insert into public.songs (id, title, composer, era, genre, difficulty, key_signature, time_signature, bpm, tabs, chords, chord_chart, description, is_premium) values

  ('f0000000-0000-0000-0000-000000000001',
   'Twinkle, Twinkle, Little Star',
   'Traditional / Jane Taylor (1806)',
   '19th century',
   'Folk / Children''s',
   'beginner', 'G Major', '4/4', 100,
   '[{"string_name":"e","positions":[3,3,10,10,12,12,10,"x",8,8,7,7,5,5,3]},{"string_name":"B","positions":[0,0,0,0,0,0,0,"x",0,0,0,0,0,0,0]}]',
   ARRAY['G','C','D','D7','Em'],
   '[{"beat":1,"chord":"G"},{"beat":3,"chord":"G"},{"beat":5,"chord":"C"},{"beat":7,"chord":"G"},{"beat":9,"chord":"D"},{"beat":11,"chord":"G"},{"beat":13,"chord":"D"},{"beat":15,"chord":"G"}]',
   'The perfect first song. Only three chords (G, C, D7) and a melody you already know by heart.',
   false),

  ('f0000000-0000-0000-0000-000000000002',
   'Amazing Grace',
   'John Newton (1779)',
   '18th century',
   'Hymn / Folk',
   'beginner', 'G Major', '3/4', 72,
   '[{"string_name":"e","positions":[3,5,3,5,3,5,7,5,3,0,0,3]},{"string_name":"B","positions":[0,0,0,0,0,0,0,0,0,3,3,0]}]',
   ARRAY['G','D','Em','C'],
   '[{"beat":1,"chord":"G"},{"beat":4,"chord":"G"},{"beat":7,"chord":"C"},{"beat":10,"chord":"G"},{"beat":13,"chord":"D"},{"beat":16,"chord":"G"}]',
   'Four chords in 3/4 time — teaches flowing melodic rhythm and beautiful minor colors. One of the world''s most beloved melodies.',
   false),

  ('f0000000-0000-0000-0000-000000000003',
   'Greensleeves',
   'Traditional English (attrib. 16th century)',
   'Renaissance / Tudor Era',
   'Folk / Classical',
   'beginner', 'A Minor', '3/4', 80,
   '[{"string_name":"e","positions":[0,0,1,3,1,0,1,3,0,3,1,0]},{"string_name":"B","positions":[1,1,0,0,0,1,0,0,0,0,0,1]}]',
   ARRAY['Am','G','F','E'],
   '[{"beat":1,"chord":"Am"},{"beat":4,"chord":"G"},{"beat":7,"chord":"F"},{"beat":10,"chord":"E"},{"beat":13,"chord":"Am"}]',
   'One of the most beautiful melodies ever written. Teaches minor keys and a haunting four-chord progression. Magical on fingerpicking.',
   false),

  ('f0000000-0000-0000-0000-000000000004',
   'Silent Night',
   'Franz Xaver Gruber (1818)',
   '19th century',
   'Carol / Folk',
   'beginner', 'C Major', '6/8', 65,
   '[{"string_name":"e","positions":[0,1,0,3,1,0,3,1,3]},{"string_name":"B","positions":[1,0,1,0,1,1,0,0,0]}]',
   ARRAY['C','G','F'],
   '[{"beat":1,"chord":"C"},{"beat":7,"chord":"G"},{"beat":13,"chord":"F"},{"beat":19,"chord":"C"}]',
   'A serene three-chord song in 6/8 — perfect for learning waltz-time strumming patterns and peaceful, sustained playing.',
   false),

  ('f0000000-0000-0000-0000-000000000005',
   'Danny Boy',
   'Traditional Irish / Frederic Weatherly (1913)',
   'Early 20th century',
   'Irish Folk / Ballad',
   'intermediate', 'G Major', '4/4', 68,
   '[{"string_name":"e","positions":[3,5,7,5,3,5,3,2,0,2,3,5,3]},{"string_name":"B","positions":[0,0,0,0,0,0,0,0,3,0,0,0,0]}]',
   ARRAY['G','D','A7','Em','Bm','C'],
   '[{"beat":1,"chord":"G"},{"beat":3,"chord":"D"},{"beat":5,"chord":"A7"},{"beat":7,"chord":"Em"},{"beat":9,"chord":"Bm"},{"beat":11,"chord":"C"},{"beat":13,"chord":"G"},{"beat":15,"chord":"D"}]',
   'An emotionally rich Irish ballad spanning six chords. Teaches expressive phrasing, dynamic variation, and intermediate chord vocabulary.',
   false),

  ('f0000000-0000-0000-0000-000000000006',
   'Scarborough Fair',
   'Traditional English (medieval)',
   'Medieval / Folk Revival',
   'Folk',
   'intermediate', 'A Minor', '3/4', 76,
   '[{"string_name":"e","positions":[0,1,3,1,0,3,1,0,1,3]},{"string_name":"B","positions":[1,0,0,0,1,0,0,1,0,0]}]',
   ARRAY['Am','F','C','Dm','G'],
   '[{"beat":1,"chord":"Am"},{"beat":4,"chord":"F"},{"beat":7,"chord":"C"},{"beat":10,"chord":"Am"},{"beat":13,"chord":"Dm"},{"beat":16,"chord":"G"}]',
   'A haunting medieval modal folk song. Perfect for developing fingerpicking technique and understanding minor modal harmony.',
   false),

  ('f0000000-0000-0000-0000-000000000007',
   'Auld Lang Syne',
   'Robert Burns / Traditional (1788)',
   '18th century',
   'Scottish Folk',
   'intermediate', 'G Major', '4/4', 80,
   '[{"string_name":"e","positions":[3,3,5,7,5,3,5,3,2,0]},{"string_name":"B","positions":[0,0,0,0,0,0,0,0,0,0]}]',
   ARRAY['G','D','A7','Em','C','Bm'],
   '[{"beat":1,"chord":"G"},{"beat":3,"chord":"G"},{"beat":5,"chord":"C"},{"beat":7,"chord":"G"},{"beat":9,"chord":"D"},{"beat":11,"chord":"G"}]',
   'The iconic New Year song in a six-chord arrangement. Teaches how minor chords (Em, Bm) add emotional depth to a major key song.',
   false),

  ('f0000000-0000-0000-0000-000000000008',
   'When the Saints Go Marching In',
   'Traditional Gospel (pre-1900)',
   '19th century',
   'Gospel / Jazz',
   'intermediate', 'C Major', '4/4', 120,
   '[{"string_name":"e","positions":[0,3,5,3,0,3,5,7,5,3]},{"string_name":"B","positions":[1,0,0,0,1,0,0,0,0,0]}]',
   ARRAY['C','F','G7'],
   '[{"beat":1,"chord":"C"},{"beat":5,"chord":"F"},{"beat":9,"chord":"C"},{"beat":13,"chord":"G7"},{"beat":17,"chord":"C"}]',
   'A joyful gospel march that teaches swing feel and how to play melody over a three-chord progression. Great for building pick speed.',
   false),

  ('f0000000-0000-0000-0000-000000000009',
   'Camptown Races',
   'Stephen Foster (1850)',
   '19th century',
   'American Folk',
   'beginner', 'G Major', '4/4', 110,
   '[{"string_name":"e","positions":[2,0,2,4,4,2,0,2,0]},{"string_name":"B","positions":[0,0,0,0,0,0,0,0,0]}]',
   ARRAY['G','D7','C'],
   '[{"beat":1,"chord":"G"},{"beat":3,"chord":"D7"},{"beat":5,"chord":"G"},{"beat":7,"chord":"C"},{"beat":9,"chord":"G"}]',
   'A lively American folk song with a bouncy rhythm perfect for practicing steady strumming patterns. Simple three-chord structure.',
   false),

  ('f0000000-0000-0000-0000-000000000010',
   'Jesu, Joy of Man''s Desiring',
   'J.S. Bach (1716)',
   'Baroque',
   'Classical',
   'advanced', 'G Major', '9/8', 55,
   '[{"string_name":"e","positions":[3,5,3,2,3,5,7,5,3,5,3,2,0]},{"string_name":"B","positions":[0,0,0,0,0,0,0,0,0,0,0,0,0]}]',
   ARRAY['G','Em','Am','D','C','Bm'],
   '[{"beat":1,"chord":"G"},{"beat":4,"chord":"Em"},{"beat":7,"chord":"Am"},{"beat":10,"chord":"D"},{"beat":13,"chord":"G"}]',
   'One of Bach''s most beloved works. A transcendent fingerpicking challenge in 9/8 time that showcases the full expressive range of the guitar.',
   true),

  ('f0000000-0000-0000-0000-000000000011',
   'House of the Rising Sun',
   'Traditional American (pre-1920)',
   'Early 20th century / American Folk',
   'Folk / Blues',
   'intermediate', 'A Minor', '6/8', 76,
   '[{"string_name":"e","positions":[0,3,1,0,1,3,0,1,3]},{"string_name":"B","positions":[1,0,1,1,0,0,1,0,0]}]',
   ARRAY['Am','C','D','F','E'],
   '[{"beat":1,"chord":"Am"},{"beat":4,"chord":"C"},{"beat":7,"chord":"D"},{"beat":10,"chord":"F"},{"beat":13,"chord":"Am"},{"beat":16,"chord":"E"}]',
   'The classic blues-folk song with the iconic Am-C-D-F-Am-C-E-E progression. Perfect for fingerpicking and learning minor key music.',
   false),

  ('f0000000-0000-0000-0000-000000000012',
   'La Bamba',
   'Traditional Mexican (pre-1900)',
   '19th century',
   'Son Jarocho / Folk',
   'beginner', 'C Major', '4/4', 130,
   '[{"string_name":"e","positions":[0,0,3,3,1,0,3,3]},{"string_name":"B","positions":[1,1,0,0,0,1,0,0]}]',
   ARRAY['C','F','G'],
   '[{"beat":1,"chord":"C"},{"beat":3,"chord":"F"},{"beat":5,"chord":"G"},{"beat":7,"chord":"C"}]',
   'A festive three-chord Mexican folk song. The I-IV-V progression is the backbone of rock and roll. High energy, instant gratification.',
   false);

-- ============================================================
-- WEEKLY SONGS (initial week)
-- ============================================================
insert into public.weekly_songs (song_id, week_start, featured_note) values
  ('f0000000-0000-0000-0000-000000000003', '2026-06-02', 'Greensleeves: this week we explore minor keys and Renaissance harmony. A must-learn for any guitarist.'),
  ('f0000000-0000-0000-0000-000000000011', '2026-06-02', 'House of the Rising Sun: the iconic Am-C-D-F fingerpicking arrangement. A true guitar rite of passage.')
on conflict (week_start) do nothing;

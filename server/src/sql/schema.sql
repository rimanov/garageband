-- NOTE: I figured we'd want this for the section on SQL
PRAGMA foreign_keys;

-- NOTE: For the SQL assignment, we could have them normalize
-- this database farther. Perhaps they can learn about SERIAL and
-- then go implement a way to change a room_name without losing
-- references by using a FOREIGN KEY into a rooms table with an 
-- int primary key.
CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL,
    artist varchar NOT NULL,
    album varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes, artist, album)
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'TestArtist', 'TestAlbum'),
       (2, 'Game of Thrones', 'G4 C4 E4 F4 G4 C4 E4 F4 G4 C4 E4 F4 G4 C4 E4', 'Game of Thrones Originals', 'Game of Thrones Originals'),
       (3, 'River flows in you', 'A4 B4 A4 G4 A4 E4 A4 B4 A4 G4 A4 E4 A4 B4 A4 G4 A4', 'Yiruma', 'Piano Songs'),
       (4, 'Jingle Bells', 'E4 E4 E4 E4 E4 E4 E4 G4 C4 D4 E4 F4 F4 F4 F4 F4 E4 E4 E4 E4 E4 D4 D4 E4 D4 G4 E4 E4 E4 E4 E4 E4 E4 G4 C4 D4 E4 F4 F4 F4 F4 F4 E4 E4 E4 E4 G4 G4 F4 D4 C4', 'James Pierpont', 'No album'),
       (5, 'Happy Birthday', 'C4 C4 D4 C4 F4 E4 C4 C4 D4 C4 G4 F4 C4 C4 C4 A4 G4 E4 D4 A5 A5 F4 G4 F4', 'Various Artist', 'No album'),
       (6, 'Twinkle Twinkle Little Star', 'C#4 C#4 G#4 G#4 A#4 A#4 G#4 F#4 F#4 F4 F4 D#4 D#4 C#4 G#4 G#4 F#4 F#4 F4 F4 D#4 G#4 G#4 F#4 F#4 F4 F4 D#4 C#4 C#4 G#4 G#4 A#4 A#4 G#4 F#4 F#4 F4 F4 D#4 D#4 C#4', 'Twinkle', 'No album'),
       (7, 'Spiderman', 'A4 C5 E5 D5 C5 A4 A4 C5 E5 F5 E5 D5 C5 A4 D5 F5 A5 G5 F5 D5 A4 C5 E5 F5 E5 D5 C5 A4 A4 E4 G4 B4 E5', 'Bob', 'Spiderman Theme'),
       (8, 'Just Give me A Reason','B5 B4 G3 G3 D3 D4 B5 B4 A4 A4 F#3 F#3 C2 A4 A4 G4 G4 G4 G4 G4 F#4 E4 F#4 D3 D4 D4 C5 B4 A4 G4 B5 B4 G3 G4 D3 B4 B4 A4 A4 F#3 F#3 C3 C4 A5 G4 G4 G4 G4 F#4 E4 F#4 D3 D4 D4 C5 B4 A4 G4 G4', 'Pink - ft Nate Ruess', 'Pink')



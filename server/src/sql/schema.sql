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
       (3, 'River flows in you', 'A4 B4 A4 G4 A4 E4 A4 B4 A4 G4 A4 E4 A4 B4 A4 G4 A4', 'Yiruma', 'Piano Songs')


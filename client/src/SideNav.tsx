// 3rd party library imports
import classNames from "classnames";
import { List } from "immutable";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  RadioButton20,
  RadioButtonChecked20,
  Music20,
} from "@carbon/icons-react";

// project imports
import { DispatchAction } from "./Reducer";
import { AppState } from "./State";
import { Instrument } from "./Instruments";
import { Visualizer } from "./Visualizers";

/** ------------------------------------------------------------------------ **
 * All the components in the side navigation.
 ** ------------------------------------------------------------------------ */

interface SideNavProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
}

type SectionProps = {
  title: string;
  height?: 25 | 50 | 75;
};

const Section: React.FC<SectionProps> = ({ title, height = 25, children }) => {
  return (
    <div className={`flex flex-column bb h-${height} b--light-gray pa3`}>
      <div className="fw7 mb2">{title} </div>
      <div className="flex-auto overflow-scroll">{children}</div>
    </div>
  );
};

interface RadioButtonProps {
  to: any;
  text: string;
  active: boolean;
  onClick: () => void;
}

function RadioButton({
  to,
  text,
  active,
  onClick,
}: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className="no-underline">
      <div
        className={classNames("f6 flex items-center black", { fw7: active })}
        onClick={onClick}
      >
        {active ? (
          <RadioButtonChecked20 className="mr1" />
        ) : (
          <RadioButton20 className="mr1" />
        )}
        <div className="dim">{text}</div>
      </div>
    </Link>
  );
}

function Instruments({ state }: SideNavProps): JSX.Element {
  const instruments: List<Instrument> = state.get("instruments");
  const activeInstrument = state.get("instrument")?.name;
  const location = useLocation();

  return (
    <Section title="Instruments">
      {instruments.map((i) => (
        <RadioButton
          key={i.name}
          to={`/${i.name}${location.search}`}
          text={i.name}
          active={i.name === activeInstrument}
          onClick={() => console.log(i.name)}
        />
      ))}
    </Section>
  );
}

function Visualizers({ state }: SideNavProps): JSX.Element {
  const visualizers: List<Visualizer> = state.get("visualizers");
  const activeVisualizer = state.get("visualizer")?.name;
  const location = useLocation();

  return (
    <Section title="Visualizers">
      {visualizers.map((v) => (
        <RadioButton
          key={v.name}
          to={{
            pathname: location.pathname,
            search: `?visualizer=${v.name}`,
          }}
          text={v.name}
          active={v.name === activeVisualizer}
          onClick={() => console.log(v.name)}
        />
      ))}
    </Section>
  );
}

function Songs({ state, dispatch }: SideNavProps): JSX.Element {
  const songs: List<any> = state.get("songs", List());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("Song");
  const [filteredSongs, setFilteredSongs] = useState(
    songs.map((value) => value)
  );

  useEffect(() => {
    setFilteredSongs(songs);
  }, [songs]);

  useEffect(() => {
    const filteredSongs = songs.filter((song) => {
      const queryWithLowerCase = query.toLowerCase();
      switch (filter) {
        case "Album":
          const album = (song.get("album") as string).toLowerCase();
          return album.includes(queryWithLowerCase);
        case "Artist":
          const artist = (song.get("artist") as string).toLowerCase();
          return artist.includes(queryWithLowerCase);
        case "Song":
          const songTitle = (song.get("songTitle") as string).toLowerCase();
          return songTitle.includes(queryWithLowerCase);
      }
    });
    setFilteredSongs(filteredSongs);
  }, [query, filter]);

  return (
    <Section title="Playlist" height={50}>
      <SearchBar setQuery={setQuery} setFilter={setFilter} />
      <div className="flex-auto overflow-scroll">
        {filteredSongs.map((song) => (
          <div
            key={song.get("id")}
            className="f6 pointer underline flex items-center no-underline i dim bb pa1"
            onClick={() =>
              dispatch(new DispatchAction("PLAY_SONG", { id: song.get("id") }))
            }
          >
            <Music20 className="mr1" />
            <div className="flex-column">
              <p className="purple pa0">{song.get("songTitle")}</p>
              <p className="dark-green pa0">{song.get("artist")}</p>
              <p className="green pa0">{song.get("album")}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

type SearchBarProps = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

type FilterType = "Album" | "Song" | "Artist";

function SearchBar({ setQuery, setFilter }: SearchBarProps): JSX.Element {
  const [value, setValue] = useState("");
  const [field, setField] = useState<FilterType>("Song");

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    setFilter(field);
  }, [field]);

  return (
    <div>
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <select
        value={field}
        onChange={(event) => {
          setField(event.target.value as FilterType);
        }}
      >
        <option value="Song" selected={true}>
          Song
        </option>
        <option value="Album">Album</option>
        <option value="Artist">Artist</option>
      </select>
    </div>
  );
}

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  return (
    <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
      <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">
        Hidden Leaf
      </div>
      <div className="flex-auto">
        <Instruments state={state} dispatch={dispatch} />
        <Visualizers state={state} dispatch={dispatch} />
        <Songs state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

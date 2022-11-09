import { useState } from 'react';
import config from '../config.json';
import styled from 'styled-components';
import Menu from '../src/components/Menu';
import { StyledTimeline } from '../src/components/StyledTimeline';

function HomePage() {
  const [busca, setBusca] = useState("");

  return (
    <>
      <div style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
      }}>
        <Menu filtro={busca} setFiltro={setBusca} />
        <Header />
        <TimeLine 
          playlists={config.playlists} 
          searchValue={busca}
        />
      </div>
    </>
  )
}

 
const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
  }
  .user-info {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 32px;
      gap: 16px;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} alt="" />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

const StyledBanner = styled.div`
  background-image: url(${({ bg }) => bg});
  height: 230px;
`;

function TimeLine({searchValue, ...props}) {
  const playlistNames = Object.keys(props.playlists);

  return (
    <StyledTimeline>
      {
        playlistNames.map((playlistName) => {
          const videos = props.playlists[playlistName];
          return (
            <section key={playlistName}>
              <h2>{playlistName}</h2>
              <div>
                {videos
                  .filter(video => {
                    const normalizedTitle = video.title.toLowerCase();
                    const normalizedSearch = searchValue.toLowerCase();
                    return normalizedTitle.includes(normalizedSearch);
                  })
                  .map(video => (
                    <a href={video.url} key={video.url}>
                      <img src={video.thumb} alt="" />
                      <span>
                        {video.title}
                      </span>
                    </a>
                  ))}
              </div>
            </section>
          )
        })
      }
    </StyledTimeline>
  )
}

export default HomePage
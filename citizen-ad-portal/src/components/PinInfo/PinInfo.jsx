import React from 'react';

function PinInfo({ info }) {
  const displayCityName = `${info.city}, ${info.state}`;

  return (
    <div>
      <div>
        {displayCityName} |{' '}
        <a
          target='_new'
          href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayCityName}`}
        >
          Wikipedia
        </a>
      </div>
      <img width={240} src={info.image} />
    </div>
  );
}

export default React.memo(PinInfo);

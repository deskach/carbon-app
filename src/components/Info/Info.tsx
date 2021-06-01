import './_info.scss';

import React from 'react';

interface InfoSectionProps {
  className: string
  heading: string
}

const InfoSection: React.FC<InfoSectionProps> = (props) => (
  <section className={`bx--row ${props.className} info-section`}>
    <div className="bx--col-md-8 bx--col-lg-4 bx--col-xlg-3">
      <h3 className="info-section__heading">{props.heading}</h3>
    </div>
    {props.children}
  </section>
);

interface InfoCardProps {
  heading: string
  body: string
  icon: React.ReactNode
}

const InfoCard: React.FC<InfoCardProps> = (props) => {
  const splitHeading = createArrayFromPhrase(props.heading)

  return (
    <article className="info-card bx--col-md-4 bx--col-lg-4 bx--col-xlg-3 bx--offset-xlg-1">
      <h4 className="info-card__heading">
        {`${splitHeading[0]} `}
        <strong>{splitHeading[1]}</strong>
      </h4>
      <p className="info-card__body">{props.body}</p>
      {props.icon}
    </article>
  );
};

// Take in a phrase and separate the third word in an array
function createArrayFromPhrase(phrase: string) {
  const splitPhrase = phrase.split(' ');
  const thirdWord = splitPhrase.pop();
  return [splitPhrase.join(' '), thirdWord];
}

export { InfoSection, InfoCard };
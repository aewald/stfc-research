import Link from 'next/link';

const colors = { epic: '#c040ff', rare: '#0090c8', uncommon: '#00a030', common: '#ffffff' };

const OfficerDetailsTemplate = (officer) => (
  <>
    <h1>
      
      <Link href="/officers">&#10094;</Link> Officer Detail
    
    </h1>
    <div>
      <h2 style={{ color: colors[`${officer.rarity.toLowerCase()}`] }}>
        <img
          src={`/images/officer_${officer.name.replace(/[ ]/g, '_').replace(/[.']/g, '')}.png`}
          width="100"
          height="100"
        />
        &nbsp;
        <strong>{officer.name}</strong>
      </h2>
      <h4>
        <span>{officer.group}</span>
      </h4>
      <h6>Rank/Tier</h6>
      <div>
        <span>{officer.class}</span>
        <span>STRENGTH</span>
        <span>8888</span>
      </div>
      <div>
        <div>
          <span>Attack</span>
          <span>888</span>
        </div>
        <div>
          <span>Defense</span>
          <span>888</span>
        </div>
        <div>
          <span>Health</span>
          <span>888</span>
        </div>
      </div>
      <div>
        <span>{officer.abilities.captain.name}</span>
        <span>{officer.abilities.officer.name}</span>
      </div>
      <div>
        <span>Level</span>
        <span>88/88</span>
        <div>
          <span>Level up</span>
          <span>EXP 888.8K</span>
        </div>
      </div>
    </div>
  </>
);

export default OfficerDetailsTemplate;

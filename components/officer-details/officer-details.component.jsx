import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form } from 'react-bootstrap';

const colors = { epic: '#c040ff', rare: '#0090c8', uncommon: '#00a030', common: '#ffffff' };

// this will be refactored and into db soon
const academyValues = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 37: 37, 38: 38, 39: 39, 40: 40, 41: 43, 42: 46, 43: 49, 44: 52, 45: 55, 46: 58, 47: 62, 48: 66, 49: 70, 50: 75};

const OfficerDetailsTemplate = (officer) => {
  const [tierLevel, setTierLevel] = useState({ currentTier: 1, tier: 1, level: 1, index: 0 });
  const [academyLevel, setAcademyLevel] = useState(0);
  const [calculatedStats, setCalculatedStats] = useState({
    attack: 0,
    defense: 0,
    health: 0,
    strength: 0
  });
  const [research, setResearch] = useState({
    academy: false,
    prime: false
  })

  useEffect(() => {
    calculateStats();
  }, [tierLevel, research, academyLevel])
 
  const calculateStrength = (atk, def, hp, currentTier) => {
    console.log('research', research);
    const str = (atk + def + hp) * (currentTier + 1);
    console.log('str', str);
    return str;
  }

  const calculateStats = () => {
    const academyValue = research.academy ? academyValues[academyLevel] / 100 : 0;
    const primeValue = research.prime ? 100 / 100 : 0;
    
    const baseAtk = officer.ranks[`rank${tierLevel.tier}`].attack[`${tierLevel.index}`];
    const baseDef = officer.ranks[`rank${tierLevel.tier}`].defense[`${tierLevel.index}`];
    const baseHp = officer.ranks[`rank${tierLevel.tier}`].health[`${tierLevel.index}`];
    
    const atk = baseAtk + (baseAtk * academyValue) + (baseAtk * primeValue);
    const def = baseDef + (baseDef * academyValue) + (baseDef * primeValue);
    const hp = baseHp + (baseHp * academyValue) + (baseHp * primeValue);
    const str = calculateStrength(atk, def, hp, tierLevel.currentTier);

    setCalculatedStats({
      strength: str,
      attack: atk,
      defense: def,
      health: hp
    });
  }

  const updateLevelHandler = (level) => {
    const tierLvl = { ...tierLevel };
    if (level <= 5) {
      tierLvl.tier = 1;
      tierLvl.level = +level,
      tierLvl.index = level - 1;
    } else if (level <= 10) {
      tierLvl.tier = 2;
      tierLvl.level = +level,
      tierLvl.index = level - 6;
    } else if (level <= 15) {
      tierLvl.tier = 3;
      tierLvl.level = +level,
      tierLvl.index = level - 11;
    } else if (level <= 20) {
      tierLvl.tier = 4;
      tierLvl.level = +level,
      tierLvl.index = level - 16;
    } else {
      tierLvl.tier = 5;
      tierLvl.level = +level,
      tierLvl.index = level - 21;
    }

    setTierLevel(prevState => ({ ...prevState, ...tierLvl }));
  }

  const updateAcademyLevelHandler = (level) => {
    setAcademyLevel(level);
  }

  const useResearchHandler = (value) => {
    console.log(value);
    setResearch({ ...research, [value]: !research[value] });
  }

  const updateCurrentTierHandler = (tier) => {
    const tierLvl = { ...tierLevel };
    tierLvl.currentTier = +tier;
    setTierLevel(prevState => ({ ...prevState, ...tierLvl }));
  }

  return (
  <>
    <h1>
      <Link href="/officers">&#10094;</Link> Officer Detail
    </h1>
    <div style={{width: '350px'}}>
      <h2 style={{ color: colors[`${officer.rarity.toLowerCase()}`], display: 'flex', justifyContent: 'left'}}>
        <span>
        <img
          src={`/images/officer_${officer.name.replace(/[ ]/g, '_').replace(/[.']/g, '')}.png`}
          width="100"
          height="100"
        />
        </span>
        <span style={{padding: '10px'}}>
        <strong>{officer.name}</strong></span>
      </h2>
      <h4>
        <span>{officer.group}</span>
      </h4>
      <div>
        <span>{officer.class}</span>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span>STRENGTH</span>
        <span>{calculatedStats.strength.toFixed(0)}</span>
      </div>
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>Attack</span>
          <span>{calculatedStats.attack.toFixed(0)}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>Defense</span>
          <span>{calculatedStats.defense.toFixed(0)}</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>Health</span>
          <span>{calculatedStats.health.toFixed(0)}</span>
        </div>
      </div>
      <div>
        <span>{officer.abilities.captain.name}</span>
      </div>
      <div>
        <span>{officer.abilities.officer.name}</span>
      </div>
      <div style={{display: 'flex', justifyContent: 'left'}}>
        <span>Tier&nbsp;</span>
        <span> {tierLevel.currentTier}</span>
        <span style={{marginLeft: 'auto'}}><Form.Control type='range' min='1' max='5' value={tierLevel.currentTier} onChange={()=> updateCurrentTierHandler(event.target.value)} /></span>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <span>Level</span>
        <span>{tierLevel.level}/30</span>
      </div>
      <div>
        <Form.Control type='range' min='1' max='30' value={tierLevel.level} onChange={()=> updateLevelHandler(event.target.value)} />
      </div>
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>Level up</span>
          <span>EXP {officer.ranks[`rank${tierLevel.tier}`].exp[`${tierLevel.index}`]}</span>
        </div>
      </div>
    </div>
    <hr />
    <h4>Research Included</h4>
    <div style={{display: 'flex', justifyContent: 'left'}}>
      <Form.Check type='checkbox' disabled={true} /> Use Research Tree&nbsp;<small>(coming soon)</small>
    </div>
    <div style={{display: 'flex', justifyContent: 'left'}}>
      <span><Form.Check type='checkbox' value={research.academy} onChange={useResearchHandler.bind(this, 'academy')} /></span>
      <span>Academy Level {academyLevel}</span>
      <span style={{marginLeft: 'auto'}}><Form.Control type='range' min='0' max='50' value={academyLevel} onChange={()=> updateAcademyLevelHandler(event.target.value)} /></span>
    </div>
    <div style={{display: 'flex', justifyContent: 'left'}}>
      <Form.Check type='checkbox' value={research.prime} onChange={useResearchHandler.bind(this, 'prime')} /> Prime Officers
    </div>
    <div style={{display: 'flex', justifyContent: 'left'}}>
      <span><Form.Check type='checkbox' value={research.academy} /></span>
      <span>Advanced Training Level 0</span>
      <span style={{marginLeft: 'auto'}}><Form.Control type='range' min='0' max='10' value='0' onChange={()=> updateAdvTrainingLevelHandler(event.target.value)} /></span>
    </div>
    <div style={{display: 'flex', justifyContent: 'left'}}>
      <span><Form.Check type='checkbox' /></span>
      <span>Attack Training Level 0</span>
      <span style={{marginLeft: 'auto'}}><Form.Control type='range' min='0' max='10' value='0' onChange={()=> updateAtkTrainingLevelHandler(event.target.value)} /></span>
    </div>
    <div style={{display: 'flex', justifyContent: 'left'}}>
      <span><Form.Check type='checkbox' /></span>
      <span>Defense Training Level 0</span>
      <span style={{marginLeft: 'auto'}}><Form.Control type='range' min='0' max='10' value='0' onChange={()=> updateDefTrainingLevelHandler(event.target.value)} /></span>
    </div>
  </>
)};

export default OfficerDetailsTemplate;

/*
zahra
lvl 10 t2
str 234
atk 16
def 10
hea 52

lvl 10 t3
str 312
atk 16
def 10
hea 52
*/
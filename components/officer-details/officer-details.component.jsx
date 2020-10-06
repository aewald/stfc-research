import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form } from 'react-bootstrap';

const colors = { epic: '#c040ff', rare: '#0090c8', uncommon: '#00a030', common: '#ffffff' };

// this will be refactored and into db soon
const academyValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,43,46,49,52,55,58,62,66,70,75];
const advTrainingValues = [0,4,6,8,11,14,18,22,27,32,40];
const atkTrainingValues = [0,4,6,8,11,14,18,22,27,32,40];
const defTrainingValues = [0,4,6,8,11,14,18,22,27,32,40];


const OfficerDetailsTemplate = (officer) => {
  const [tierLevel, setTierLevel] = useState({ currentTier: 1, tier: 1, level: 1, index: 0 });
  const [academyLevel, setAcademyLevel] = useState(0);
  const [advTrainingLevel, setAdvTrainingLevel] = useState(0);
  const [atkTrainingLevel, setAtkTrainingLevel] = useState(0);
  const [defTrainingLevel, setDefTrainingLevel] = useState(0);
  const [calculatedStats, setCalculatedStats] = useState({
    attack: 0,
    defense: 0,
    health: 0,
    strength: 0,
  });
  const [research, setResearch] = useState({
    academy: false,
    prime: false,
    advTraining: false,
    atkTraining: false,
    defTraining: false
  });  

  const abilityBuff = officer.abilities.officer.description.match(/Attack|Defense|Health/);

  const statName = abilityBuff[0].toLowerCase();
  const [abilityValue, setAbilityValue] = useState({
    attack: 0,
    defense: 0,
    health: 0,
    [statName]: officer.abilities.officer.rank[tierLevel.tier]
  })


  useEffect(() => {
    calculateStats();
  }, [tierLevel, research, academyLevel, advTrainingLevel, atkTrainingLevel, defTrainingLevel]);

  const calculateStrength = (atk, def, hp, currentTier) => {
    const str = (+atk + +def + +hp) * (currentTier + 1);
    return str;
  };

  const calculateStats = () => {
    if (statName) {
      setAbilityValue({[statName]: officer.abilities.officer.rank[tierLevel.tier-1]})
    }
    const academyValue = research.academy ? academyValues[academyLevel] / 100 : 0;
    const primeValue = research.prime ? 100 / 100 : 0;
    const advTrainingValue = research.advTraining ? advTrainingValues[advTrainingLevel] / 100 : 0;
    const atkTrainingValue = research.atkTraining ? atkTrainingValues[atkTrainingLevel] / 100 : 0;
    const defTrainingValue = research.defTraining ? defTrainingValues[defTrainingLevel] / 100 : 0;
    const officerAbilityValue = abilityValue.attack / 100;

    const baseAtk = officer.ranks[`rank${tierLevel.tier}`].attack[`${tierLevel.index}`];
    const baseDef = officer.ranks[`rank${tierLevel.tier}`].defense[`${tierLevel.index}`];
    const baseHp = officer.ranks[`rank${tierLevel.tier}`].health[`${tierLevel.index}`];
    
    const atk =
      (baseAtk + baseAtk * academyValue + baseAtk * primeValue + baseAtk * advTrainingValue + baseAtk * atkTrainingValue + baseAtk * officerAbilityValue).toFixed(0);
    const def =
      (baseDef + baseDef * academyValue + baseDef * primeValue + baseDef * advTrainingValue + baseDef * defTrainingValue).toFixed(0);
    const hp = (baseHp + baseHp * academyValue + baseHp * primeValue + baseHp * advTrainingValue).toFixed(0);
    const str = calculateStrength(atk, def, hp, tierLevel.currentTier);

    setCalculatedStats({
      strength: str,
      attack: atk,
      defense: def,
      health: hp,
    });
  };

  const updateLevelHandler = (level, currentTier) => {
    const tierLvl = { ...tierLevel };
    tierLvl.currentTier = currentTier || tierLvl.currentTier;
    if (level <= 5) {
      tierLvl.tier = 1;
      (tierLvl.level = +level), (tierLvl.index = level - 1);
    } else if (level <= 10) {
      tierLvl.tier = 2;
      (tierLvl.level = +level), (tierLvl.index = level - 6);
    } else if (level <= 15) {
      tierLvl.tier = 3;
      (tierLvl.level = +level), (tierLvl.index = level - 11);
    } else if (level <= 20) {
      tierLvl.tier = 4;
      (tierLvl.level = +level), (tierLvl.index = level - 16);
    } else {
      tierLvl.tier = 5;
      (tierLvl.level = +level), (tierLvl.index = level - 21);
    }

    setTierLevel((prevState) => ({ ...prevState, ...tierLvl }));
  };

  const updateAcademyLevelHandler = (level) => {
    setAcademyLevel(level);
  };
  const updateAdvTrainingLevelHandler = (level) => {
    setAdvTrainingLevel(level);
  };
  const updateAtkTrainingLevelHandler = (level) => {
    setAtkTrainingLevel(level);
  };
  const updateDefTrainingLevelHandler = (level) => {
    setDefTrainingLevel(level);
  };

  const useResearchHandler = (value) => {
    setResearch({ ...research, [value]: !research[value] });
  };

  const updateCurrentTierHandler = (tier) => {
    const currentTier = +tier;
    let level = tierLevel.level;
    if (level > officer.ranks[`rank${tier}`].maxLevel) {
      level = officer.ranks[`rank${tier}`].maxLevel;
      return updateLevelHandler(level, currentTier);
    }

    return setTierLevel((prevState) => ({ ...prevState, currentTier }));
  };

  return (
    <>
      <h1>
        <Link href="/officers">&#10094;</Link> Officer Detail
      </h1>
      <div style={{ width: '350px' }}>
        <h2 style={{ color: colors[`${officer.rarity.toLowerCase()}`], display: 'flex', justifyContent: 'left' }}>
          <span>
            <img
              src={`/images/officer_${officer.name.replace(/[ ]/g, '_').replace(/[.']/g, '')}.png`}
              width="100"
              height="100"
            />
          </span>
          <span style={{ padding: '10px' }}>
            <strong>{officer.name}</strong>
          </span>
        </h2>
        <h4>
          <span>{officer.group}</span>
        </h4>
        <div style={{ display: 'flex', justifyContent: 'left' }}>
          <span>
            <img src={`/images/${officer.class}.png`} alt={officer.class} width='50' height='50' style={{borderRadius: '10px'}} />
          </span>
          <span style={{paddingLeft: '10px', lineHeight: '20px'}}><span style={{display: 'block'}}><small>STRENGTH</small></span><span style={{display: 'block', fontWeight: '700', fontSize: '30px'}}>{calculatedStats.strength.toFixed(0)}</span></span>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Attack</span>
            <span>{calculatedStats.attack}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Defense</span>
            <span>{calculatedStats.defense}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Health</span>
            <span>{calculatedStats.health}</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #fff', padding: '10px 0' }}>
          <span>Captain Maneuver</span>
          <span>{officer.abilities.captain.name}</span>
        </div>
        <div style={{padding: '0 0 10px'}}>
          <span>{officer.abilities.captain.description.replace('+', officer.abilities.captain.value)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #fff', padding: '10px 0' }}>
          <span>Officer Ability</span>
          <span>{officer.abilities.officer.name}</span>
        </div>
        <div style={{padding: '0 0 10px'}}>
          <span>{officer.abilities.officer.description.replace('+', officer.abilities.officer.rank[tierLevel.currentTier - 1])}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', borderTop: '1px solid #fff', padding: '10px 0 0' }}>
          <span>Tier&nbsp;</span>
          <span> {tierLevel.currentTier}</span>
          <span style={{ marginLeft: 'auto' }}>
            <Form.Control
              type="range"
              min="1"
              max="5"
              value={tierLevel.currentTier}
              onChange={() => updateCurrentTierHandler(event.target.value)}
            />
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Level</span>
          <span>{tierLevel.level}/{officer.ranks[`rank${tierLevel.currentTier}`].maxLevel}</span>
        </div>
        <div>
          <Form.Control
            type="range"
            min="1"
            max={officer.ranks[`rank${tierLevel.currentTier}`].maxLevel}
            value={tierLevel.level}
            onChange={() => updateLevelHandler(event.target.value)}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Level up</span>
            <span>EXP {officer.ranks[`rank${tierLevel.tier}`].exp[`${tierLevel.index}`]}</span>
          </div>
        </div>
      </div>
      <hr />
      <h4>Research Included</h4>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <Form.Check type="checkbox" disabled={true} /> Use Research Tree&nbsp;<small>(coming soon)</small>
      </div>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <span>
          <Form.Check type="checkbox" value={research.academy} onChange={useResearchHandler.bind(this, 'academy')} />
        </span>
        <span>Academy Level {academyLevel}</span>
        <span style={{ marginLeft: 'auto' }}>
          <Form.Control
            type="range"
            min="0"
            max="50"
            value={academyLevel}
            onChange={() => updateAcademyLevelHandler(event.target.value)}
          />
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <Form.Check type="checkbox" value={research.prime} onChange={useResearchHandler.bind(this, 'prime')} /> Prime
        Officers
      </div>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <span>
          <Form.Check type="checkbox" value={research.advTraining} onChange={useResearchHandler.bind(this, 'advTraining')} />
        </span>
        <span>Adv Training Level {advTrainingLevel}</span>
        <span style={{ marginLeft: 'auto' }}>
          <Form.Control
            type="range"
            min="0"
            max="10"
            value={advTrainingLevel}
            onChange={() => updateAdvTrainingLevelHandler(event.target.value)}
          />
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <span>
          <Form.Check type="checkbox" value={research.atkTraining} onChange={useResearchHandler.bind(this, 'atkTraining')} />
        </span>
        <span>Attack Training Level {atkTrainingLevel}</span>
        <span style={{ marginLeft: 'auto' }}>
          <Form.Control
            type="range"
            min="0"
            max="10"
            value={atkTrainingLevel}
            onChange={() => updateAtkTrainingLevelHandler(event.target.value)}
          />
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <span>
          <Form.Check type="checkbox" value={research.defTraining} onChange={useResearchHandler.bind(this, 'defTraining')} />
        </span>
        <span>Defense Training Level {defTrainingLevel}</span>
        <span style={{ marginLeft: 'auto' }}>
          <Form.Control
            type="range"
            min="0"
            max="10"
            value={defTrainingLevel}
            onChange={() => updateDefTrainingLevelHandler(event.target.value)}
          />
        </span>
      </div>
    </>
  );
};

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


cadet sulu
lvl 30 t5
str 2460 (2322) ?
atk 216 (194) ? 150*15%=22.5 (150*29%=43.5) 22.5+43.5+150 = 216
def 97
hea 97

cadet mccoy
lvl 20 t4
str 1180 (1135) ?
atk 57
def 57
health 122 (114) ? (114/122=93% or 7%) (8)

JoBi's 
cadet sulu
lvl 30 t5
str 4560 (4428)
atk 393 (371) (22) 150*15%=22.5 (150*39%=58.5) (150*4%=6)x2 22.5+58.5+6+6+150+150 = 231
def 185
health 182

cadet mccoy
lvl 30 t5
str 4404 (4410)
atk 185
def 185
health 364 (365)

*/
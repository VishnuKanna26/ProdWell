export const calculateWellness = (log) => {
    // Normalize values (example calculation)
    const sleepScore = Math.min(log.sleep / 8, 1) * 40;
    const exerciseScore = Math.min(log.exercise / 60, 1) * 30;
    const dietScore = (log.diet.protein > 50 ? 20 : 15);
    const stressScore = (10 - log.stress) * 10;
    return Math.round(sleepScore + exerciseScore + dietScore + stressScore);
  };
  
  export const calculateProductivity = (log) => {
    // Example: Productivity = (Exercise impact + Sleep impact) - Stress impact
    const base = (log.exercise * 0.5) + (log.sleep * 3) - (log.stress * 4);
    return Math.min(Math.max(base, 0), 100);
  };
// DO NOT EDIT ✏️❗

import { expect, test, describe } from 'vitest'
import { extractMonsterNames, calculateThreatLevels, organizeByThreatLevel, sum } from './index.js'
import data from './data.js'

describe('Monster Names Extraction', () => {
  test('should extract all monster names correctly', () => {
    const expectedNames = [
      'Imp',
      'Zombie',
      'Hell Knight',
      'Cacodemon',
      'Baron of Hell',
      'Cyberdemon',
    ]

    const result = extractMonsterNames(data)

    // Check that all expected names are present
    expect(result).toHaveLength(expectedNames.length)
    expectedNames.forEach((name) => {
      expect(result).toContain(name)
    })
  })
})

describe('Threat Level Calculation', () => {
  test('should calculate threat levels correctly', () => {
    const expectedThreatLevels = [
      { name: 'Imp', threatLevel: 1200 }, // 60 * 20
      { name: 'Zombie', threatLevel: 200 }, // 20 * 10
      { name: 'Hell Knight', threatLevel: 22500 }, // 500 * 45
      { name: 'Cacodemon', threatLevel: 14000 }, // 400 * 35
      { name: 'Baron of Hell', threatLevel: 60000 }, // 1000 * 60
      { name: 'Cyberdemon', threatLevel: 320000 }, // 4000 * 80
    ]

    const result = calculateThreatLevels(data)

    // Check each monster has correct threat level
    expectedThreatLevels.forEach((expected) => {
      const monster = result.find((m) => m.name === expected.name)
      expect(monster).toBeDefined()
      expect(monster.threatLevel).toBe(expected.threatLevel)
    })
  })
})

describe('Monster Organization by Threat Level', () => {
  test('should organize monsters by threat level categories', () => {
    const result = organizeByThreatLevel(data)

    // Test structure - these are example categories, students might choose different thresholds
    expect(result).toHaveProperty('lowThreat')
    expect(result).toHaveProperty('mediumThreat')
    expect(result).toHaveProperty('highThreat')

    // Check specific monsters are in appropriate categories
    // Assuming low < 10000, medium 10000-50000, high > 50000
    expect(result.lowThreat.map((m) => m.name)).toContain('Imp')
    expect(result.lowThreat.map((m) => m.name)).toContain('Zombie')

    expect(result.mediumThreat.map((m) => m.name)).toContain('Hell Knight')
    expect(result.mediumThreat.map((m) => m.name)).toContain('Cacodemon')

    expect(result.highThreat.map((m) => m.name)).toContain('Baron of Hell')
    expect(result.highThreat.map((m) => m.name)).toContain('Cyberdemon')

    // Alternative test if students use different category names:
    // We can check that monsters are properly ordered by threat
    const allMonsters = [
      ...Object.values(result)[0],
      ...Object.values(result)[1],
      ...Object.values(result)[2],
    ]

    const sortedByThreat = [...allMonsters].sort((a, b) => a.threatLevel - b.threatLevel)
    expect(allMonsters).toEqual(sortedByThreat)
  })
})

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

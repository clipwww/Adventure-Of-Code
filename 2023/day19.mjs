import { inputDemo, input } from './input/day19.mjs';

console.time('init')
const [workflows, ratings] = input.split('\n\n')
const ruleMap = new Map()
workflows.split('\n').forEach(line => {
  let [name, rule] = line.split('{')
  rule = rule.replace('}', '')
  const rules = rule.split(',')

  ruleMap.set(name, rules)
})
const ratingMapArr = ratings.split('\n').map(line => {
  const map = new Map()
  line.split(',').forEach(rating => {
    const [key, value] = rating.replace(/\{|\}/g, '').split('=')
    map.set(key, value)
  })
  return map
})

console.timeEnd('init')
// console.log(ruleMap)
// console.log(ratingMapArr)

function part1() {
  console.time('part1')

  const ans1 = ratingMapArr.map(map => {
    let name = 'in'
    while (name !== 'A' && name !== 'R') {
      // console.log(map, name)
      const rules = ruleMap.get(name)
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i]
        if (rule.includes('>') || rule.includes('<')) {
          const sign = rule.includes('>') ? '>' : '<'
          const [key, other] = rule.split(sign)
          const [value, target] = other.split(':')
          if (sign === '>' ? +map.get(key) > +value : +map.get(key) < +value) {
            name = target
            break;
          }
        } else {
          name = rule
        }
      }
    }

    if (name === 'A') {
      return Array.from(map).reduce((sum, [key, value]) => sum + +value, 0)
    } else {
      return 0
    }
  }).reduce((sum, cur) => sum + cur, 0)

  console.log('part1 ans:', ans1)
  console.timeEnd('part1')
}

part1()

function part2() {
  console.time('part2')

  let arr = [{ name: 'in', combinations: [[4000, 1], [4000, 1], [4000, 1], [4000, 1]] }]
  while (arr.some(item => item.name !== 'A')) {
    // console.log(JSON.stringify(arr, null, 2))
    let newArr = []
    for (let j = 0; j < arr.length; j++) {
      const item = arr[j]
      if (item.name === 'A') {
        newArr.push(item)
        continue
      }
      const rules = ruleMap.get(item.name)

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i]
        const newCombinations = JSON.parse(JSON.stringify(item.combinations))

        if (rule.split(':')?.[1] === 'R' || rule === 'R') {
          continue;
        }

        if (/<|>/.test(rule)) {
          const sign = rule.includes('>') ? '>' : '<'
          const [key, other] = rule.split(sign)
          const [value] = other.split(':')
          const idx = ['x', 'm', 'a', 's'].indexOf(key)
          if (sign === '>') {
            newCombinations[idx][1] = Math.max(newCombinations[idx][1], +value + 1)
          } else {
            newCombinations[idx][0] = Math.min(newCombinations[idx][0], +value - 1)
          }
        }

        rules.slice(0, i).forEach(preRule => {
          const sign = preRule.includes('>') ? '>' : '<'
          const [key, other] = preRule.split(sign)
          const [value] = other.split(':')
          const idx = ['x', 'm', 'a', 's'].indexOf(key)
          if (sign === '>') {
            newCombinations[idx][0] = Math.min(newCombinations[idx][0], +value)
          } else {
            newCombinations[idx][1] = Math.max(newCombinations[idx][1], +value)
          }
        })

        newArr.push({
          name: rule.split(':')?.[1] || rule,
          combinations: newCombinations
        })
      }
    }

    arr = newArr
  }

  // console.log(arr)
  console.log('part2 ans:', arr.reduce((sum, cur) => sum + cur.combinations
    .reduce((sum, [max, min]) => sum * (max - min + 1), 1)
    , 0))
  console.timeEnd('part2')
}

part2()
import { inputDemo, input } from './input/day19.mjs';

console.time('init')
const [workflows, ratings] = inputDemo.split('\n\n')
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
console.log(ruleMap)
// console.log(ratingMapArr)

function part1() {
  console.time('part1')

  const ans1 = ratingMapArr.map(map => {
    let name = 'in'
    while(name !== 'A' && name !== 'R') {
      // console.log(map, name)
      const rules = ruleMap.get(name)
      for(let i=0; i<rules.length; i++) {
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

  let arr = ['in']
  let count = 0
  while(arr.length) {
    console.log(arr)
    let newArr = []
    for(let j=0; j<arr.length;j++) {
      const name = arr[j]
      const rules = ruleMap.get(name)
      for(let i=0; i<rules.length; i++) {
        const rule = rules[i]
        if (rule.includes('>') || rule.includes('<')) {
          const sign = rule.includes('>') ? '>' : '<'
          const [key, other] = rule.split(sign)
          const [value, target] = other.split(':')
          if (target === 'A') {
            count++
          } else if (target !== 'R') {
            count++
            newArr.push(target)
          }
        } else {
          if (rule === 'A') {
            count++
          }
          else if (rule !== 'R') {
            newArr.push(rule)
          }
        }
      }
    }
    arr = [...newArr]
  }

  console.log('part2 ans:', count)
  console.timeEnd('part2')
}

part2()
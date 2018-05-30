import test from 'ava'
import {
  countdown
} from '../js-tips/utils'

test.cb('countdown work with positive number', t => {
  let times = 5
  let count = 0
  countdown(times, (day, hour, min, sec) => {
    count += 1
    t.true(day === '00' && hour === '00' && hour === '00' && sec - 0 === (times - count))
  })

  setTimeout(function () {
    t.is(count, times)
  }, times * 1000);

  setTimeout(function () {
    t.is(count, times)
    t.end();
  }, (times + 1) * 1000);
})

test.cb('countdown work with zero', t => {
  let times = 0
  let count = 0
  countdown(times, (day, hour, min, sec) => {
    count += 1
    t.true(day === '00' && hour === '00' && hour === '00' && sec === '00')
  })

  setTimeout(function () {
    t.is(count, 1)
  }, times * 1000);

  setTimeout(function () {
    t.is(count, 1)
    t.end();
  }, (times + 1) * 1000);
})

test.cb('countdown work with negative number', t => {
  let times = -5
  let count = 0
  countdown(times, (day, hour, min, sec) => {
    count += 1
    t.true(day === '00' && hour === '00' && hour === '00' && sec === '00')
  })

  setTimeout(function () {
    t.is(count, 1)
  }, times * 1000);

  setTimeout(function () {
    t.is(count, 1)
    t.end();
  }, (times + 1) * 1000);
})

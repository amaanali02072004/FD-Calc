import { useState, useEffect } from 'react'
import { months } from './common/months'

const FDCalc = () => {
  const [cxType, setCxType] = useState('normal')
  const [fdType, setFdType] = useState('cumulative')
  const [depAmt, setDepAmt] = useState(5000)
  const [tenureType, setTenureType] = useState('yearMonthDay')
  const [tenureYears, setTenureYears] = useState(1)
  const [tenureMonths, setTenureMonths] = useState(0)
  const [tenureDays, setTenureDays] = useState(0)
  const [maturityAmount, setMaturityAmount] = useState(0)
  const [interestRate, setInterestRate] = useState(0)

  const paramCheck = () => {
    // if (cxType === 'normal') {
    if (fdType === 'cumulative' || fdType === 'quarterlyPayout') {
      if (tenureYears >= 6) {
        setInterestRate(6.20)
      } else if (tenureYears >= 4) {
        setInterestRate(7)
      } else if (tenureYears >= 2) {
        setInterestRate(7.15)
      }
    } else if (fdType === 'monthlyPayout') {
      if (tenureYears >= 6) {
        setInterestRate(6.17)
      } else if (tenureYears >= 4) {
        setInterestRate(6.96)
      } else if (tenureYears >= 2) {
        setInterestRate(7.11)
      }
    }
    // }

    if (tenureType !== 'yearMonthDay') {
      setTenureYears(0)
      setTenureMonths(0)
    }

    if (fdType === 'shortTermFD') {
      setTenureType('daysOnly')
    } else {
      setTenureType('yearMonthDay')
    }

    if (cxType == 'normal') {
      switch (fdType) {
        case 'monthlyPayout':
          setInterestRate(7.06)
          break
        case 'shortTermFD':
          setInterestRate(3)
          break

        default:
          setInterestRate(7.1)
          break
      }
    } else {
      switch (fdType) {
        case 'monthlyPayout':
          setInterestRate(7.55)
          break
        case 'shortTermFD':
          setInterestRate(3.5)
          break

        default:
          setInterestRate(7.6)
          break
      }

    }
  }

  const cxTypeHandler = e => {
    let value = e.target.value
    setCxType(value)
  }

  const fdTypeHandler = e => {
    let value = e.target.value
    setFdType(value)
  }

  const depAmtHandler = e => {
    let value = +e.target.value
    setDepAmt(value)
  }

  const tenureTypeHandler = e => {
    let value = e.target.value
    setTenureType(value)
  }

  const tenureYearsHandler = e => {
    let value = +e.target.value

    setTenureYears(value)
  }
  const tenureMonthsHandler = e => {
    let value = +e.target.value
    setTenureMonths(value)
  }
  const tenureDaysHandler = e => {
    let value = +e.target.value
    setTenureDays(value)
  }

  const fdAmtCalcHandler = e => {
    e?.preventDefault()
    paramCheck()
    const p = +depAmt
    const r = +interestRate / 100
    const tenYrs = +tenureYears
    const tenMnths = +tenureMonths
    const tenDays = +tenureDays

    const amount = p * (1 + (r * tenYrs) + (r * tenMnths / 12) + (r * tenDays / 365))
    setMaturityAmount(amount.toFixed(2))
  }

  useEffect(() => {
    fdAmtCalcHandler()
  }, [
    cxType,
    fdType,
    depAmt,
    tenureYears,
    tenureMonths,
    tenureDays,
    interestRate
  ])

  return (
    <form
      id="fdCalc"
    // onChange={fdAmtCalcHandler}
    // onSubmit={fdAmtCalcHandler}
    >
      <p>Type of Customer</p>
      <input type="radio" id="normal" name="cxType" value="normal" onChange={cxTypeHandler} />
      <label for="normal">
        Normal
      </label>
      <input type="radio" id="senior" name="cxType" value="senior" onChange={cxTypeHandler} />
      <label for="senior">
        Senior
      </label>

      <p>Type of Fixed Deposit</p>
      <select id="fdType" name="fdType" form="fdCalc" value={fdType} onChange={fdTypeHandler}>
        <option value="cumulative">Cumulative</option>
        <option value="quarterlyPayout">Quarterly Payout</option>
        <option value="monthlyPayout">monthly Payout</option>
        <option value="shortTermFD">Short Term FD</option>
      </select>
      <p>date of fixed deposit</p>
      <p>{new Date().getDate()}-{months[new Date().getMonth()]}-{new Date().getFullYear()}</p>

      <p>amt of deposit</p>
      <input type="number" value={depAmt} onChange={depAmtHandler} />

      <p>select tenure</p>
      <input type="radio" id="yearMonthDay" name="tenure" value="yearMonthDay" onChange={tenureTypeHandler} />
      <label for="yearMonthDay">
        Yers / Months / Days
      </label>
      <input type="radio" id="daysOnly" name="tenure" value="daysOnly" onChange={tenureTypeHandler} />
      <label for="daysOnly">
        Days Only
      </label>
      {console.log('tenureType --- ', tenureType)}
      {console.log('fdType --- ', fdType)}
      {(tenureType === 'yearMonthDay' || fdType !== 'shortTermFD') &&
        <>
          <p>years</p>
          <select id="fdYears" name="fdYears" form="fdCalc" value={tenureYears} onChange={tenureYearsHandler}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          <p>months</p>
          <select id="fdMonths" name="fdMonths" form="fdCalc" value={tenureMonths} onChange={tenureMonthsHandler}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </>
      }
      <p>days</p>
      <input type="number" value={tenureDays} onChange={tenureDaysHandler} />
      {/* <input type="submit" value="submit" /> */}

      <br />
      maturity value: {maturityAmount}
      <br />
      interest value: {maturityAmount - depAmt}
      <br />
      interest rate: {interestRate} %
    </form>
  )
}

export default FDCalc

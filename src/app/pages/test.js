import { useState, useEffect } from 'react'
import { months } from './common/months'

const FDCalc = () => {
  const [cxType, setCxType] = useState('normal')
  const [fdType, setFdType] = useState('cumulative')
  const [depAmt, setDepAmt] = useState(5000)
  const [tenureType, setTenureType] = useState('yearMonthDay')
  const [tenureTime, setTenureTime] = useState(0)
  const [tenureYears, setTenureYears] = useState(1)
  const [tenureMonths, setTenureMonths] = useState(0)
  const [tenureDays, setTenureDays] = useState(0)
  const [maturityAmount, setMaturityAmount] = useState(0)
  const [interestRate, setInterestRate] = useState(0)

  const paramCheck = () => {
    setTenureTime(+(+tenureYears + (+tenureMonths / 12) + (+tenureDays / 365)).toFixed(1))

    // integrate change of months and daysss
    // if (fdType === 'cumulative' || fdType === 'quarterlyPayout') {
    //   if (tenureYears >= 6) {
    //     setInterestRate(6.20)
    //   } else if (tenureYears >= 4) {
    //     setInterestRate(7)
    //   } else if (tenureYears >= 2) {
    //     setInterestRate(7.15)
    //   }
    // } else if (fdType === 'monthlyPayout') {
    //   if (tenureYears >= 6) {
    //     setInterestRate(6.17)
    //   } else if (tenureYears >= 4) {
    //     setInterestRate(6.96)
    //   } else if (tenureYears >= 2) {
    //     setInterestRate(7.11)
    //   }
    // }

    // base interest valuesss!!
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

    // interest changesss....
    if (cxType === 'normal') {
      if (fdType === 'cumulative' || fdType === 'quarterlyPayout') {
        if (tenureTime > 5) {
          setInterestRate(6.20)
        } else if (tenureTime > 3) {
          setInterestRate(7.00)
        } else if (tenureTime >= 2) {
          setInterestRate(7.15)
        } else if (tenureTime > 1 && tenureTime < 2) {
          setInterestRate(7.40)
        } else if (tenureTime === 1) {
          setInterestRate(7.10)
        } else if (tenureTime < 1) {
          setInterestRate(6)
        }
      } else if (fdType === 'monthlyPayout') {
        if (tenureTime > 5) {
          setInterestRate(6.17)
        } else if (tenureTime > 3) {
          setInterestRate(6.96)
        } else if (tenureTime >= 2) {
          setInterestRate(7.11)
        } else if (tenureTime > 1 && tenureTime < 2) {
          setInterestRate(7.35)
        } else if (tenureTime === 1) {
          setInterestRate(7.06)
        } else if (tenureTime < 1) {
          setInterestRate(5.97)
        }
      } else if (fdType === 'shortTermFD') {
        if (tenureDays >= 180) {
          setInterestRate(7)
        } else if (tenureDays < 180) {
          setInterestRate(4.25)
        } else if (tenureDays <= 120) {
          setInterestRate(4.00)
        } else if (tenureDays <= 90) {
          setInterestRate(3.50)
        } else if (tenureDays <= 45) {
          setInterestRate(3.25)
        } else if (tenureDays <= 30) {
          setInterestRate(3.00)
        } else if (tenureDays < 15) {
          setInterestRate(2.75)
        }
      }
    } else if (cxType === 'senior') {
      if (fdType === 'cumulative' || fdType === 'quarterlyPayout') {
        if (tenureTime > 5) {
          setInterestRate(6.70)
        } else if (tenureTime > 3) {
          setInterestRate(7.60)
        } else if (tenureTime >= 2) {
          setInterestRate(7.65)
        } else if (tenureTime > 1 && tenureTime < 2) {
          setInterestRate(7.90)
        } else if (tenureTime === 1) {
          setInterestRate(7.60)
        } else if (tenureTime < 1) {
          setInterestRate(6.50)
        }
      } else if (fdType === 'monthlyPayout') {
        if (tenureTime > 5) {
          setInterestRate(6.66)
        } else if (tenureTime > 3) {
          setInterestRate(7.55)
        } else if (tenureTime >= 2) {
          setInterestRate(7.60)
        } else if (tenureTime > 1 && tenureTime < 2) {
          setInterestRate(7.85)
        } else if (tenureTime === 1) {
          setInterestRate(7.55)
        } else if (tenureTime < 1) {
          setInterestRate(6.46)
        }
      } else if (fdType === 'shortTermFD') {
        // if (tenureDays >= 180) {
        //   setInterestRate(7)
        // } else if (tenureDays < 180) {
        //   setInterestRate(4.25)
        // } else if (tenureDays <= 120) {
        //   setInterestRate(4.00)
        // } else if (tenureDays <= 90) {
        //   setInterestRate(3.50)
        // } else if (tenureDays <= 45) {
        //   setInterestRate(3.25)
        // } else if (tenureDays <= 30) {
        //   setInterestRate(3.00)
        // } else if (tenureDays < 15) {
        //   setInterestRate(2.75)
        // }
      }
    }

    if (tenureType !== 'yearMonthDay') {
      setTenureYears(0)
      setTenureMonths(0)
    }

    if (fdType === 'shortTermFD') {
      setTenureType('daysOnly')
    } else {
      setTenureType('yearMonthDay')
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
    console.log(tenureTime, tenureDays, interestRate)
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
    tenureTime,
    tenureYears,
    tenureMonths,
    tenureDays,
    interestRate
  ])

  return (
    <form
      id="fdCalc"
    // onChange={paramCheck}
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
        Years / Months / Days
      </label>
      <input type="radio" id="daysOnly" name="tenure" value="daysOnly" onChange={tenureTypeHandler} />
      <label for="daysOnly">
        Days Only
      </label>
      {tenureType !== 'daysOnly' &&
        <>
          <p>years</p>
          <select id="fdYears" name="fdYears" form="fdCalc" value={tenureYears} onChange={tenureYearsHandler}>
            {[...Array(11).keys()].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>

          <p>months</p>
          <select id="fdMonths" name="fdMonths" form="fdCalc" value={tenureMonths} onChange={tenureMonthsHandler}>
            {[...Array(13).keys()].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
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

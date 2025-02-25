import { useState, useEffect } from 'react'
import { months } from '../../common/months'
import {
  CalcGraph,
  Calcvalue,
  Container,
  Graph,
  HeaderTextContent,
  HeaderTextIcon,
  HeaderTextWrapper,
  HolderWrapper,
  InnerWrapper,
  InputWrapper,
  Legend,
  Lhs,
  OuterWrapper,
  RadioWrapper,
  Rhs
} from './style'


const InputComponent = ({ range = true, defaultValue, label, type = 'text', options, psudo, value, onChange, min, max, step, name }) => {
  return (
    <InputWrapper psudo={psudo}>
      <div>
        <p>{label}</p>
        {(type !== 'select' && type !== 'radio') &&
          <input type="text" name={name} value={value} onChange={onChange} disabled={type == 'select' || type == 'radio'} />
        }
      </div>
      {((type !== 'select' && type !== 'radio') && range) &&
        <input type="range" name={name} min={min} max={max} value={value} step={step} onChange={onChange} />
      }
      {type == 'radio' &&
        <RadioWrapper>
          {options.map(i => (
            <div key={i.value}>
              <input id={i.value} checked={i.value === defaultValue} type={type} name={name} value={i.value} onChange={onChange} disabled={i?.disabled} />
              <label htmlFor={i.value} disabled={i?.disabled}>
                {i.title}
              </label>
            </div>
          ))}
        </RadioWrapper>
      }
      {type == 'select' &&
        <select name={name} value={value} onChange={onChange}>
          {options.map(i => (
            <option key={i.value} value={i.value}>{i.title}</option>
          ))}
        </select>
      }
    </InputWrapper>
  )
}

const FDUI = () => {
  const [cxType, setCxType] = useState('normal')
  const [fdType, setFdType] = useState('cumulative')
  const [depAmt, setDepAmt] = useState(5000)
  const [tenureType, setTenureType] = useState('yearMonthDay')
  const [tenureTime, setTenureTime] = useState(0)
  const [tenureYears, setTenureYears] = useState(1)
  const [tenureMonths, setTenureMonths] = useState(0)
  const [tenureDays, setTenureDays] = useState(0)
  const [maturityAmount, setMaturityAmount] = useState(0)
  const [interestRate, setInterestRate] = useState(1)

  const paramCheck = () => {
    setTenureTime(+(+tenureYears + (+tenureMonths / 12) + (+tenureDays / 365)).toFixed(1))

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
        console.log(tenureDays, interestRate)
        if (tenureDays >= 180) {
          setInterestRate(7)
        } else if (tenureDays > 120) {
          setInterestRate(4.25)
        } else if (tenureDays > 90) {
          setInterestRate(4.00)
        } else if (tenureDays > 45) {
          setInterestRate(3.50)
        } else if (tenureDays > 30) {
          setInterestRate(3.25)
        } else if (tenureDays > 15) {
          setInterestRate(3.00)
        } else {
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
        if (tenureDays >= 180) {
          setInterestRate(7.50)
        } else if (tenureDays >= 120) {
          setInterestRate(4.75)
        } else if (tenureDays >= 90) {
          setInterestRate(4.50)
        } else if (tenureDays >= 45) {
          setInterestRate(4.00)
        } else if (tenureDays >= 30) {
          setInterestRate(3.75)
        } else if (tenureDays >= 15) {
          setInterestRate(3.50)
        } else {
          setInterestRate(3.25)
        }
      }
    }
  }

  const cxTypeHandler = e => {
    let value = e.target.value
    setCxType(value)
  }

  const fdTypeHandler = e => {
    let value = e.target.value
    if (value === 'shortTermFD') {
      setTenureType('daysOnly')
      setTenureYears(0)
      setTenureMonths(0)
    } else {
      setTenureType('yearMonthDay')
    }
    setFdType(value)
  }

  const depAmtHandler = e => {
    let value = +e.target.value
    setDepAmt(value)
  }

  const tenureTypeHandler = e => {
    let value = e.target.value
    if (value == 'daysOnly') {
      setTenureYears(0)
      setTenureMonths(0)
    }
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

  const interestRateHandler = e => {
    let value = +e.target.value
    setInterestRate(value)
  }

  const fdAmtCalcHandler = e => {
    e?.preventDefault()
    paramCheck()
    console.log('param')
    const p = +depAmt
    const r = +interestRate / 100
    const tenYrs = +tenureYears
    const tenMnths = +tenureMonths
    const tenDays = +tenureDays

    const totalYears = tenYrs + (tenMnths / 12) + (tenDays / 365)

    const amount = fdType === 'cumulative'
      ? p * Math.pow((1 + r / 4), 4 * totalYears) // cumulative
      : p * (1 + (r * tenYrs) + (r * tenMnths / 12) + (r * tenDays / 365)) // quarterly
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
    tenureTime,
    tenureType,
    interestRate
  ])

  const principalData = {
    label: 'Principal Amount',
    name: 'principal',
    value: depAmt,
    onChange: depAmtHandler,
    min: 1000,
    max: 1000000,
    step: 100,
    psudo: {
      pos: 'before',
      content: '₹'
    }
  }

  const interestData = {
    label: 'Expected Return Rate (p.a.)',
    name: 'interest',
    value: interestRate,
    onChange: interestRateHandler,
    min: 1,
    max: 20,
    step: .1
  }

  const customerData = {
    label: 'type of customer',
    name: 'cxType',
    value: cxType,
    onChange: cxTypeHandler,
    type: 'radio',
    defaultValue: cxType,
    options: [
      {
        title: 'Normal',
        value: 'normal'
      },
      {
        title: 'Senior',
        value: 'senior'
      }
    ]
  }

  const fdTypeData = {
    label: 'type of fixed deposit',
    name: 'fdType',
    value: fdType,
    onChange: fdTypeHandler,
    type: 'select',
    options: [
      {
        title: 'Cumulative',
        value: 'cumulative'
      },
      {
        title: 'Quarterly Payout',
        value: 'quarterlyPayout'
      },
      {
        title: 'Monthly Payout',
        value: 'monthlyPayout'
      },
      {
        title: 'Short Term FD',
        value: 'shortTermFD'
      },
    ]
  }

  const tenureTypeData = {
    label: 'select tenure',
    name: 'tenureType',
    value: tenureType,
    onChange: tenureTypeHandler,
    type: 'radio',
    defaultValue: tenureType,
    options: [
      {
        title: 'Years / Months / Days',
        value: 'yearMonthDay',
        disabled: fdType == 'shortTermFD'
      },
      {
        title: 'Days Only',
        value: 'daysOnly'
      },
    ]
  }

  const tenureYearsData = {
    label: 'years',
    name: 'tenureYears',
    value: tenureYears,
    onChange: tenureYearsHandler,
    min: 1,
    max: 20,
    range: false,
    step: 1
  }

  const tenureMonthsData = {
    label: 'months',
    name: 'tenureMonths',
    value: tenureMonths,
    onChange: tenureMonthsHandler,
    range: false,
    min: 0,
    max: 12,
    step: 1
  }

  const tenureDaysData = {
    label: 'days',
    name: 'tenureDays',
    value: tenureDays,
    onChange: tenureDaysHandler,
    range: false,
    min: 0,
    // max: 30,
    step: 1
  }

  return (
    <OuterWrapper>
      <Container>
        <InnerWrapper>
          <div>
            <HeaderTextWrapper>
              <HeaderTextIcon>
                <img src="https://k-calculators.netlify.app/template/images/ic_img1.svg" alt="" />
              </HeaderTextIcon>
              <HeaderTextContent>
                <h1>Fixed Deposit Calculator</h1>
                <p>A fixed deposit typically offers a higher interest rate than a savings account. It is a great way
                  to build a fund that you can use for a vacation, higher education, buying something big or an
                  emergency. It is also a safe way to make your money grow for retirement planning.</p>
              </HeaderTextContent>
            </HeaderTextWrapper>
          </div>

          <form id="fdCalc">
            <HolderWrapper>
              <Lhs>
                <InputComponent {...customerData} />
                <InputComponent {...fdTypeData} />
                <InputComponent {...principalData} />
                <InputComponent {...tenureTypeData} />
                {tenureType !== 'daysOnly' &&
                  <>
                    <InputComponent {...tenureYearsData} />
                    <InputComponent {...tenureMonthsData} />
                  </>
                }
                <InputComponent {...tenureDaysData} />
                <InputComponent {...interestData} />
              </Lhs>
              <Rhs>
                <Calcvalue>
                  <h2>Total Value</h2>
                  <span>₹{Number(+maturityAmount).toFixed(2)}</span>
                </Calcvalue>
                <CalcGraph>
                  <Legend color='#253844'>Invested Amt.<span>
                    ₹{depAmt}
                  </span></Legend>
                  <Legend color='#ff0049'>Est. Earned<span>
                    ₹{Number(+maturityAmount - depAmt).toFixed(2)}
                  </span></Legend>
                  <Graph width={depAmt / Number(+maturityAmount) * 100} />
                  <p><strong>Note:</strong> Quarterly interest Payout is Considered.</p>
                </CalcGraph>
              </Rhs>
            </HolderWrapper>


          </form>

        </InnerWrapper>
      </Container>
    </OuterWrapper>
  )
}

export default FDUI

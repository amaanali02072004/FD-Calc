import { useState, useEffect } from 'react'
import { months } from '../../common/months'
import { CalcGraph, Calcvalue, Container, Graph, HeaderTextContent, HeaderTextIcon, HeaderTextWrapper, HolderWrapper, InnerWrapper, InputWrapper, Legend, Lhs, OuterWrapper, Rhs } from './style'


const InputComponent = ({ label, type = 'text', psudo, value, onChange, min, max, step, name }) => {
  return (
    <InputWrapper psudo={psudo}>
      <div>
        <p>{label}</p>
        <input type={type} name={name} value={value} onChange={onChange} />
      </div>
      <input type="range" name={name} min={min} max={max} value={value} step={step} onChange={onChange} />
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
    setTenureYears(0)
    setTenureMonths(0)
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
    const p = +depAmt
    const r = +interestRate / 100
    const tenYrs = +tenureYears
    const tenMnths = +tenureMonths
    const tenDays = +tenureDays

    const totalYears = tenYrs + (tenMnths / 12) + (tenDays / 365)

    const amount = p * Math.pow((1 + r / 4), 4 * totalYears)
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

  const tenureData = {
    label: 'Time Period',
    name: 'tenureYears',
    value: tenureYears,
    onChange: tenureYearsHandler,
    min: 1,
    max: 20,
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
                <InputComponent {...principalData} />
                <InputComponent {...interestData} />
                <InputComponent {...tenureData} />
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

import { useState, useEffect } from 'react'

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

  // Function to determine interest rate based on customer type, FD type, and tenure
  const getInterestRate = () => {
    let rate = 0

    // Base interest rates based on customer type
    const baseRates = {
      normal: {
        cumulative: [6.20, 7, 7.15],
        quarterlyPayout: [6.17, 6.96, 7.11],
        monthlyPayout: 7.06,
        shortTermFD: 3
      },
      senior: {
        cumulative: [6.60, 7.30, 7.60],
        quarterlyPayout: [6.50, 7.30, 7.60],
        monthlyPayout: 7.55,
        shortTermFD: 3.50
      }
    }

    // Select rates based on the type
    const rates = baseRates[cxType][fdType]
    if (fdType === 'monthlyPayout' || fdType === 'shortTermFD') {
      rate = rates
    } else {
      const yearRates = rates
      // Choose rate based on tenure years
      if (tenureYears >= 6) rate = yearRates[0]
      else if (tenureYears >= 4) rate = yearRates[1]
      else if (tenureYears >= 2) rate = yearRates[2]
    }

    setInterestRate(rate)
  }

  // Function to calculate the maturity amount
  const fdAmtCalcHandler = () => {
    const p = depAmt
    const r = interestRate / 100
    const tYears = tenureYears + tenureMonths / 12 + tenureDays / 365

    // Calculate maturity amount using simple interest formula
    const amount = p * (1 + r * tYears)
    setMaturityAmount(amount.toFixed(2))
  }

  // Update interest rate and maturity amount when inputs change
  useEffect(() => {
    getInterestRate()
    fdAmtCalcHandler()
  }, [cxType, fdType, depAmt, tenureYears, tenureMonths, tenureDays])

  return (
    <form id="fdCalc">
      <p>Type of Customer</p>
      <input type="radio" id="normal" name="cxType" value="normal" checked={cxType === 'normal'} onChange={() => setCxType('normal')} />
      <label htmlFor="normal">Normal</label>
      <input type="radio" id="senior" name="cxType" value="senior" checked={cxType === 'senior'} onChange={() => setCxType('senior')} />
      <label htmlFor="senior">Senior</label>

      <p>Type of Fixed Deposit</p>
      <select id="fdType" name="fdType" value={fdType} onChange={(e) => setFdType(e.target.value)}>
        <option value="cumulative">Cumulative</option>
        <option value="quarterlyPayout">Quarterly Payout</option>
        <option value="monthlyPayout">Monthly Payout</option>
        <option value="shortTermFD">Short Term FD</option>
      </select>

      <p>Amount of Deposit</p>
      <input type="number" value={depAmt} onChange={(e) => setDepAmt(Number(e.target.value))} />

      <p>Select Tenure</p>
      <input type="radio" id="yearMonthDay" name="tenure" value="yearMonthDay" checked={tenureType === 'yearMonthDay'} onChange={() => setTenureType('yearMonthDay')} />
      <label htmlFor="yearMonthDay">Years / Months / Days</label>
      <input type="radio" id="daysOnly" name="tenure" value="daysOnly" checked={tenureType === 'daysOnly'} onChange={() => setTenureType('daysOnly')} />
      <label htmlFor="daysOnly">Days Only</label>

      {tenureType === 'yearMonthDay' && (
        <>
          <p>Years</p>
          <select id="fdYears" name="fdYears" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))}>
            {[...Array(11).keys()].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>

          <p>Months</p>
          <select id="fdMonths" name="fdMonths" value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value))}>
            {[...Array(12).keys()].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </>
      )}

      <p>Days</p>
      <input type="number" value={tenureDays} onChange={(e) => setTenureDays(Number(e.target.value))} />

      <div>
        <br />
        <strong>Maturity Value:</strong> ₹{maturityAmount}
        <br />
        <strong>Interest Value:</strong> ₹{(maturityAmount - depAmt).toFixed(2)}
        <br />
        <strong>Interest Rate:</strong> {interestRate} %
      </div>
    </form>
  )
}

export default FDCalc

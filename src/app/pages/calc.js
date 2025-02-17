import { useState, useEffect } from 'react'

export default function Home() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [time, setTime] = useState('')
  const [timeUnit, setTimeUnit] = useState('years') // Default unit is years
  const [maturityAmount, setMaturityAmount] = useState(null)
  const [fdType, setFdType] = useState('cumulative') // Default FD type is Cumulative

  // Function to update interest rate based on FD type and time
  const updateInterestRate = () => {
    let interestRate = 0

    // Interest rate logic based on FD type
    if (fdType === 'cumulative') {
      interestRate = time > 1 ? 6.5 : 5.5 // Higher rate for long-term
    } else if (fdType === 'quarterly') {
      interestRate = time > 1 ? 5.5 : 4.5 // Lower rate for quarterly payout
    } else if (fdType === 'monthly') {
      interestRate = time > 1 ? 5.0 : 4.0 // Lower rate for monthly payout
    } else if (fdType === 'short-term') {
      interestRate = time <= 1 ? 4.0 : 4.5 // Short-term FD
    }

    setRate(interestRate)
  }

  // Trigger interest rate change when FD type or time changes
  useEffect(() => {
    updateInterestRate()
  }, [fdType, time, timeUnit])

  // Convert time to years based on selected time unit (years, months, days)
  const convertToYears = (time, unit) => {
    if (unit === 'months') {
      return time / 12 // Convert months to years
    } else if (unit === 'days') {
      return time / 365 // Convert days to years
    }
    return time // If unit is 'years', return the value directly
  }

  // Function to calculate maturity amount
  const calculateFD = () => {
    if (principal && rate && time) {
      const p = parseFloat(principal)
      const r = parseFloat(rate) / 100 // converting to decimal
      const t = convertToYears(parseFloat(time), timeUnit) // Convert time to years

      // FD formula: A = P * (1 + (r * t)) for simple interest
      const amount = p * (1 + (r * t))
      setMaturityAmount(amount.toFixed(2))
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Fixed Deposit (FD) Calculator</h1>

      <div>
        <label htmlFor="principal">Principal Amount (P): </label>
        <input
          type="number"
          id="principal"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Enter principal"
        />
      </div>

      <div>
        <label htmlFor="fdType">FD Type: </label>
        <select
          id="fdType"
          value={fdType}
          onChange={(e) => setFdType(e.target.value)}
        >
          <option value="cumulative">Cumulative (Interest added to principal)</option>
          <option value="quarterly">Quarterly Payout</option>
          <option value="monthly">Monthly Payout</option>
          <option value="short-term">Short Term (up to 1 year)</option>
        </select>
      </div>

      <div>
        <label htmlFor="time">Time Period: </label>
        <input
          type="number"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter time period"
        />
      </div>

      <div>
        <label htmlFor="timeUnit">Time Unit: </label>
        <select
          id="timeUnit"
          value={timeUnit}
          onChange={(e) => setTimeUnit(e.target.value)}
        >
          <option value="years">Years</option>
          <option value="months">Months</option>
          <option value="days">Days</option>
        </select>
      </div>

      <div>
        <label htmlFor="rate">Rate of Interest (r): </label>
        <input
          type="text"
          id="rate"
          value={rate}
          disabled
          readOnly
          placeholder="Rate is auto-calculated"
        />
      </div>

      <button onClick={calculateFD} style={{ padding: '10px', marginTop: '10px' }}>
        Calculate Maturity Amount
      </button>

      {maturityAmount !== null && (
        <div style={{ marginTop: '20px' }}>
          <h2>Maturity Amount: ₹{maturityAmount}</h2>
        </div>
      )}
    </div>
  )
}

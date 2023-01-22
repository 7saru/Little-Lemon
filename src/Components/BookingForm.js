import { React, useState } from "react";
import { useNavigate } from "react-router";
import Image from "../assets/restaurant chef B.jpg";

function BookingForm(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState(() => {
    if (typeof props.availableTimes === "function") {
      return props.availableTimes()[0];
    } else {
      return props.availableTimes[0];
    }
  });
  const [diners, setDiners] = useState(0);
  const [occasion, setOccasion] = useState("");
  const navigate = useNavigate();
  function submitHandler(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    if (props.submitForm(formData)) {
      navigate("/confirmed-booking");
    }
  }

  return (
    <section className="container form-section">
      <article className="booking">
        <div className="image">
          <p>Reserve a Table</p>
          <div>
            <img src={Image} alt="Reservation" />
          </div>
        </div>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <p>Please customize your reservation:</p>
            <label htmlFor="res-date" aria-label="Date">
              <i className="fa-regular fa-calendar"></i>
              <input
                aria-roledescription="date-picker"
                aria-required
                type="date"
                id="res-date"
                value={date}
                name="date"
                required
                onChange={(e) => {
                  setDate(e.target.value);
                  props.setAvailableTimes({ selectedDate: e.target.value });
                }}
              />
            </label>
            <label htmlFor="res-time" aria-label="Time">
              <i className="fa-regular fa-clock"></i>
              <select
                aria-roledescription="time-picker"
                id="res-time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              >
                {typeof props.availableTimes === "function"
                  ? props
                      .availableTimes()
                      .map((el) => <option key={el}>{el}</option>)
                  : props.availableTimes.map((el) => (
                      <option key={el}>{el}</option>
                    ))}
              </select>
            </label>
            <label htmlFor="guests" aria-label="Diners">
              <i className="fa-solid fa-user"></i>
              <input
                aria-roledescription="diners-picker"
                aria-required
                type="number"
                placeholder="0"
                min="1"
                max="10"
                id="guests"
                value={diners}
                onChange={(e) => setDiners(e.target.value)}
              />
            </label>
            <label htmlFor="occasion" aria-label="Occasion">
              <i className="fa-solid fa-champagne-glasses"></i>
              <select
                aria-roledescription="occasion-picker"
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              >
                <option>Anniversary</option>
                <option>Birthday</option>
                <option>Engagement</option>
              </select>
            </label>
          </div>
          {date.length > 0 && diners >= 1 && diners <= 10 && time.length > 0 ? (
            <input
              aria-label="On Click"
              type="submit"
              value="Make your reservation"
              id="submit-button"
            />
          ) : (
            <input
              aria-label="On Click"
              type="submit"
              disabled
              style={{ backgroundColor: "#333333" }}
              value="Make your reservation"
              id="submit-button"
            />
          )}
        </form>
      </article>
    </section>
  );
}

export default BookingForm;

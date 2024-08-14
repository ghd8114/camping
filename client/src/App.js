import React from "react";
import { Reservation } from "./View/Reservation";
import ReservationPayment from "./View/ReservationPayment";
import PaymentComplete from "./View/PaymentComplete";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Detailreview from "./View/Detailreview";
import NewsEvent from "./View/NewsEvent";
import Reviewwrite from "./View/Reviewwrite";
import Reviewlist from "./View/Reviewlist";
import Eventlist from "./View/Eventlist";
import Newswrite from "./View/Newswrite";
import Editreview from "./View/Editreview";
import EditNewsEvent from "./View/EditNewsEvent"; // Import the new component
import { ReviewProvider } from "./Component/ReviewContext";
import { NewsProvider } from "./Component/NewsContext";
import CampingRoom from "./View/CampingRoom";
import Community from "./View/Community";

function App() {
  return (
    <ReviewProvider>
      <NewsProvider>
        <Router>
          <div>
            <header>
              <p>헤더임</p>
              <nav>
                <ul>
                  <li>
                    <Link to="/Reviewlist">Reviewlist</Link>
                  </li>
                  <li>
                    <Link to="/Eventlist">Eventlist</Link>
                  </li>
                  <li>
                    <Link to="/Reservation">예약하기</Link>
                  </li>
                  <li>
                    <Link to="/CampingRoom">CampingRoom</Link>
                  </li>
                  <li>
                    <Link to="/Community">Community</Link>
                  </li>
                </ul>
              </nav>
            </header>
            <Routes>
              <Route path="/Reservation" element={<Reservation />} />
              <Route
                path="/ReservationPayment/:productName"
                element={<ReservationPayment />}
              />
              <Route path="/PaymentComplete" element={<PaymentComplete />} />
              <Route path="/Detailreview/:id" element={<Detailreview />} />
              <Route path="/Newsevent/:id" element={<NewsEvent />} />
              <Route path="/Reviewwrite" element={<Reviewwrite />} />
              <Route path="/Reviewlist" element={<Reviewlist />} />
              <Route path="/Eventlist" element={<Eventlist />} />
              <Route path="/Newswrite" element={<Newswrite />} />
              <Route path="/Editreview/:id" element={<Editreview />} />
              <Route
                path="/EditNewsevent/:id"
                element={<EditNewsEvent />}
              />{" "}
              <Route path="/CampingRoom" element={<CampingRoom />} />{" "}
              <Route path="/Community" element={<Community />} />{" "}
            </Routes>
            <footer>
              <p>푸터임</p>
            </footer>
          </div>
        </Router>
      </NewsProvider>
    </ReviewProvider>
  );
}

export default App;

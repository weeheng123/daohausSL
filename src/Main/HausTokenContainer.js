import "./HausTokenContainer.css";
import { ReactComponent as LogoDownArrow } from "../assets/logo_downarrow.svg";

function HausTokenContainer() {
  return (
    <div className="container">
      <div className="haus-token-container">
        <div className="haus-token-container-header">
          <h2>Haus</h2>
          <h2>$0.00</h2>
        </div>
        <div className="haus-token-container-content">
          <table>
            <thead>
              <tr>
                <th>Network</th>
                <th>Balance</th>
                <th>Value</th>
                <th>
                  <LogoDownArrow />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>All</td>
                <td>0 Haus</td>
                <td>$0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HausTokenContainer;

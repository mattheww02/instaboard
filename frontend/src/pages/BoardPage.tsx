import Board from "../components/Board";
import ChatBox from "../components/ChatBox";

const BoardPage: React.FC = () => {
  return (
    <div>
      <div className="container px-5">
        <div className="row">
          <div className="col-md-8 mb-3">
            <Board />
          </div>
          <div className="col-md-4 mb-3 d-flex">
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;

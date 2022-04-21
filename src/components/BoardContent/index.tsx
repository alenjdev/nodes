import { Component, ReactNode } from "react";
import { TopicBoard } from "./TopicBoard";
import nodes from "../../config/moduleConfig";
import { Header } from "./Header";
import { Topic } from "./Topic";

interface IBoardContentProps {
  onlineNodes: any;
}

export class BoardContent extends Component<IBoardContentProps> {
  render(): ReactNode {
    const { onlineNodes } = this.props;
    return (
      <TopicBoard>
        <Header title={"Nodes"} />
        {nodes.map((_, idx) => {
          const node = onlineNodes.keys.indexOf(_);
          return (
            <Topic
              key={idx}
              name={_}
              topicState={
                node >= 0 && onlineNodes.values[node]
                  ? "good_standing"
                  : "not_found"
              }
            />
          );
        })}
      </TopicBoard>
    );
  }
}

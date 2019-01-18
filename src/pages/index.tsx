import React from "react";
import {Query} from "react-apollo";
import {gql} from "apollo-boost";

interface Props {
}

class Index extends React.Component<Props> {
  render() {
      const id = new Date().getMilliseconds();
    // const id = "some fixed string";
    return (
        <section className="section-container mood-root">

            <div className="content-wrapper">
                <Query query={gql`
# Try to write your query here
query User($id: ID!) {
  User(id: $id) {
    id
  }
}
            `} variables={
                    {
                        id
                    }
                }>
                    {(result) => {
                        if (!result || !result.data || result.loading || result.error) {
                            return null;
                        }
                        return (
                            <div>
                                {result.data.User.id}
                            </div>
                        );
                    }}
                </Query>
            </div>
        </section>
    );
  }
}

export default Index;

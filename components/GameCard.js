const GameCard = props => {

  return (
    <Card raised >
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>Game Host: </Card.Description>
      </Card.Content>
    </Card>

  );
};

export default GameCard

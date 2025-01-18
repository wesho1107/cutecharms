import Matter from "matter-js";

const Physics = (entities: any, { time }: { time: { delta: number } }) => {
    const { engine } = entities.physics;
    Matter.Engine.update(engine, time.delta);
  
    // Update charm positions
    const charms = entities.charms;
    if (charms && charms.bodies) {
      charms.bodies.forEach((body: Matter.Body) => {
        body.position = body.position;
        body.angle = body.angle;
      });
    }
  
    return entities;
  };
  
  export default Physics;
import { createConnection } from "typeorm";
import User from "./entity/User";

createConnection()
  .then(async (connection) => {
    const repo = connection.getMongoRepository(User);

    const foo1 = new User();
    foo1.firstName = `John`;
    foo1.lastName = `Doe`;

    await repo.save(foo1);

    const users = await repo.find({
      where: {
        _id: {
          $in: [foo1.id],
        },
      },
    });

    console.log(users);
  })
  .catch((e) => {
    console.error(e);
  });

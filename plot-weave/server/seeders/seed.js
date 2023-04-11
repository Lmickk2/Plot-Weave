const db = require('../config/connection');
const { User, Thought, Question } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');

db.once('open', async () => {
  try {
    await OriginalPost.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, postAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: postAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
    for (let i = 0; i < questionSeeds.length; i++) {
      const { _id, questionAuthor } = await Question.create(questionSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: questionAuthor },
        {
          $addToSet: {
            questions: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

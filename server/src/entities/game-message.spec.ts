import { GameMessage } from './game-message';
import { LineSegment } from './line-segment';
import { Point } from './point';

describe('GameMessage', () => {
  // Assemble

  // Shared values
  const heading = 'A HEADING';
  const messageBody = 'A MESSAGE';
  const line: LineSegment = new LineSegment(new Point(1, 1), new Point(2, 2));

  it('INITIALIZE', () => {
    // Act
    const message = GameMessage.Initialize(heading, messageBody);
    // Assert
    const expected = {
      msg: 'INITIALIZE',
      body: { newLine: null, heading, message: messageBody },
    };
    expect(message).toEqual(expected);
  });

  it('UPDATE_TEXT', () => {
    // Act
    const message = GameMessage.UpdateText(heading, messageBody);

    // Assert
    const expected = {
      msg: 'UPDATE_TEXT',
      body: { newLine: null, heading, message: messageBody },
    };
    expect(message).toEqual(expected);
  });

  it('VALID_START_NODE', () => {
    // Act
    const message = GameMessage.ValidStartNode(heading, messageBody);

    // Assert
    const expected = {
      msg: 'VALID_START_NODE',
      body: { newLine: null, heading, message: messageBody },
    };
    expect(message).toEqual(expected);
  });

  it('INVALID_START_NODE', () => {
    // Act
    const message = GameMessage.InvalidStartNode(heading, messageBody);
    // Assert
    const expected = {
      msg: 'INVALID_START_NODE',
      body: { newLine: null, heading, message: messageBody },
    };
    expect(message).toEqual(expected);
  });

  it('VALID_END_NODE', () => {
    // Act
    const message = GameMessage.ValidEndNode(heading, messageBody, line);
    // Assert
    const expected = {
      msg: 'VALID_END_NODE',
      body: {
        newLine: {
          start: { x: 1, y: 1 },
          end: { x: 2, y: 2 },
        },
        heading,
        message: messageBody,
      },
    };
    expect(message).toEqual(expected);
  });

  it('INVALID_END_NODE', () => {
    // Act
    const message = GameMessage.InvalidEndNode(heading, messageBody);
    // Assert
    const expected = {
      msg: 'INVALID_END_NODE',
      body: { newLine: null, heading, message: messageBody },
    };
    expect(message).toEqual(expected);
  });

  it('GAME_OVER', () => {
    // Act
    const message = GameMessage.GameOver(heading, messageBody, line);
    // Assert
    const expected = {
      msg: 'GAME_OVER',
      body: {
        newLine: {
          start: { x: 1, y: 1 },
          end: { x: 2, y: 2 },
        },
        heading,
        message: messageBody,
      },
    };
    expect(message).toEqual(expected);
  });
});

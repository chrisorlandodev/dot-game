import { GameMessageType } from './game-message.type';
import { LineOutput } from './line-output';
import { LineSegment } from './line-segment';

/**
 * Game Message response
 */
export class GameMessage {
  public readonly body: { newLine: null | LineOutput; heading: string; message: string };

  private constructor(
    public msg: string,
    heading: string = '',
    message: string = '',
    newLine: LineOutput | null = null
  ) {
    this.msg = msg;
    this.body = { newLine, heading, message };
  }

  /**
   *
   * @param messageType
   * @param heading
   * @param message
   * @param line
   * @constructor
   */
  private static create(
    messageType: string,
    heading: string,
    message: string,
    line?: LineSegment
  ): GameMessage {
    const newLine = line ? new LineOutput(line) : null;
    return new GameMessage(messageType, heading, message, newLine);
  }

  /////////////////////////////////////////////////////
  // Static methods to safely create game messages
  ////////////////////////////////////////////////////

  /**
   * Create an INITIALIZE game message
   *
   * @param heading
   * @param message
   */
  static Initialize(heading: string, message: string) {
    return GameMessage.create(GameMessageType.Initialize, heading, message);
  }

  /**
   * Create a VALID_START_NODE game message
   *
   * @param heading
   * @param message
   */
  static ValidStartNode(heading: string, message: string) {
    return GameMessage.create(GameMessageType.ValidStartNode, heading, message);
  }

  /**
   * Create an INVALID_START_NODE game message
   *
   * @param heading
   * @param message
   */
  static InvalidStartNode(
    heading: string,
    message: string = 'You must start on either end of the path!'
  ) {
    return GameMessage.create(GameMessageType.InvalidStartNode, heading, message);
  }

  /**
   * Create a VALID_END_NODE game message
   *
   * @param heading
   * @param message
   * @param newLine
   */
  static ValidEndNode(heading: string, message: string, newLine: LineSegment): GameMessage {
    return GameMessage.create(GameMessageType.ValidEndNode, heading, message, newLine);
  }

  /**
   * Create an INVALID_END_NODE game message
   *
   * @param heading
   * @param message
   */
  static InvalidEndNode(heading: string, message: string = 'Not a valid line.') {
    return GameMessage.create(GameMessageType.InvalidEndNode, heading, message);
  }

  /**
   * Create a GAME_OVER game message
   *
   * @param heading
   * @param message
   * @param newLine
   */
  static GameOver(heading: string, message: string, newLine: LineSegment): GameMessage {
    return GameMessage.create(GameMessageType.GameOver, heading, message, newLine);
  }

  /**
   * Create a GAME_OVER game message
   *
   * @param heading
   * @param message
   */
  static UpdateText(heading: string, message: string): GameMessage {
    return GameMessage.create(GameMessageType.UpdateText, heading, message);
  }
}

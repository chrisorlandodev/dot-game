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
  private static Construct(
    messageType: string,
    heading: string,
    message: string,
    line?: LineSegment
  ): GameMessage {
    const newLine = line ? new LineOutput(line) : null;
    return new GameMessage(messageType, heading, message, newLine);
  }

  /////////////////////////////////////////////////////
  // Static methods to safely construct a game messages
  /////////////////////////////////////////////////////

  /**
   * Create in an INITIALIZE game message
   *
   * @param heading
   * @param message
   */
  static Initialize(heading: string, message: string) {
    return GameMessage.Construct(GameMessageType.Initialize, heading, message);
  }

  /**
   * Create in a VALID_START_NODE game message
   *
   * @param heading
   * @param message
   */
  static ValidStartNode(heading: string, message: string) {
    return GameMessage.Construct(GameMessageType.ValidStartNode, heading, message);
  }

  /**
   * Create in an INVALID_START_NODE game message
   *
   * @param heading
   * @param message
   */
  static InvalidStartNode(
    heading: string,
    message: string = 'You must start on either end of the path!'
  ) {
    return GameMessage.Construct(GameMessageType.InvalidStartNode, heading, message);
  }

  /**
   * Create in a VALID_END_NODE game message
   *
   * @param heading
   * @param message
   * @param newLine
   */
  static ValidEndNode(heading: string, message: string, newLine: LineSegment): GameMessage {
    return GameMessage.Construct(GameMessageType.ValidEndNode, heading, message, newLine);
  }

  /**
   * Create in an INVALID_END_NODE game message
   *
   * @param heading
   * @param message
   */
  static InvalidEndNode(heading: string, message: string = 'Not a valid line.') {
    return GameMessage.Construct(GameMessageType.InvalidEndNode, heading, message);
  }

  /**
   * Create in a GAME_OVER game message
   *
   * @param heading
   * @param message
   * @param newLine
   */
  static GameOver(heading: string, message: string, newLine: LineSegment): GameMessage {
    return GameMessage.Construct(GameMessageType.GameOver, heading, message, newLine);
  }

  /**
   * Create in a GAME_OVER game message
   *
   * @param heading
   * @param message
   */
  static UpdateText(heading: string, message: string): GameMessage {
    return GameMessage.Construct(GameMessageType.UpdateText, heading, message);
  }
}

import * as shuffle from 'crypto-shuffle';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

export abstract class UserPinHelper {
  private static PIN_LENGTH = 4;

  /**
   * Returns 4-digits hashed PIN
   */
  public static async generate(): Promise<string> {
    const pinCodeArray: string[] = [];
    const seed: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i: number = 0; i < this.PIN_LENGTH; i++) {
      const random: string = shuffle(seed.slice(0));
      pinCodeArray.push(random[0]);
    }

    const pin: string = pinCodeArray.join('');
    Logger.log(pin, 'PIN');
    const hashedPin: string = await bcrypt.hash(pin, 10);

    return hashedPin;
  }

  /**
   * Compare user PIN with hashed PIN
   */
  public static compare(hashedPin: string, pin: string): Promise<boolean> {
    return bcrypt.compare(pin, hashedPin);
  }
}

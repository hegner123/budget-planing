export interface Array<NotificationObject> {
  /**
   * Removes the last element from an array and returns it.
   */
  pop(): NotificationObject | undefined;

  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: NotificationObject[]): number;
}

export interface NotificationObject {
  id: string;
  message: string;
  type: string;
}

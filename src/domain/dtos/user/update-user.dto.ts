export class UpdateUserDTO {
  private constructor(public name?: string, public imgUrl?: string) {}

  static create(object: { [key: string]: any }): [string?, UpdateUserDTO?] {
    const { name, imgUrl } = object;

    if (name !== undefined && typeof name !== "string") {
      return ["name must be a string"];
    }

    if (imgUrl !== undefined && typeof imgUrl !== "string") {
      return ["imgUrl must be a string"];
    }

    return [undefined, new UpdateUserDTO(name, imgUrl)];
  }
}

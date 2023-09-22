import db from "../config/postgres";

class ProfileRepository {
  private queryGetProfileInfo: string = "select * from profile where uuid = $1";
  private queryEditProfileInfo: string =
    "update profile set firstname = $1, lastname = $2, gender = $3, address = $4, social_media = $5 where uuid = $6";

  public getProfileInfo(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      db.query(this.queryGetProfileInfo, [id], (err: any, result: any) => {
        if (err) {
          return reject({
            status: 500,
            message: "internal server error",
          });
        }
        return resolve({
          status: 200,
          data: result.rows[0],
        });
      });
    });
  }

  public editProfileInfo(body: any, id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const { firstname, lastname, gender, address, socialMedia } = body;

      db.query(
        this.queryEditProfileInfo,
        [firstname, lastname, gender, address, socialMedia ?? null, id],
        (err: any, result: any) => {
          if (err) {
            console.log(err);
            return reject({
              status: 500,
              message: "internal server errors",
            });
          }
          return resolve({
            status: 201,
            message: "Edit Profile Success",
            data: result.rows[0],
          });
        }
      );
    });
  }
}

export default new ProfileRepository();

class ApiError extends Error{
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
class contactService{
    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
        }
        async findByName(name) {
        return await this.find({
        name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id){
        return await this.contact.findOne({
            _id: ObjectId.isvalid(id) ? new ObjectId(id):null,
        });
    }
    async update(id, payload) {
        const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
        );
        return result.value;
    }
    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async findFavorite() {
        return await this.find({ favorite: true });
    }
    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = ApiError;
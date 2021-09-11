const {User} = require('./models');

console.log(User);

const addNewLead = async (req,res) => {
    const { id, firstName, lastName, phoneNumber, address, state, zipCode, email } = req.user.get();
    try {
        const findUser = await User.findOne({
            where: {id: id}
        });

        findUser.getLead()
    } catch (error) {
        
    }

}
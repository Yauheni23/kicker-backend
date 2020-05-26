const CallRepository = require('../repositories/call-repository');
const mailer = require('../mailer');

class CallService {
    constructor () {
        this.callRepository = new CallRepository();
    }

    getAll (filter = {}) {
        return this.callRepository.getAll()
            .then(response => response.filter(call => +call.creatorId === +filter.id || +call.opponentId === +filter.id));
    }

    create (data) {
        return this.callRepository.create({
            date: data.date, creatorId: data.creatorId, opponentId: data.opponentId
        })
            .then(call => call.setStatus(3));
    }

    destroy (options) {
        return this.callRepository.destroy(options);
    }

    async update ({date, creatorConfirmed, opponentConfirmed}, options) {
        const [call] = await this.callRepository.getAll(options);

        if (!creatorConfirmed && !opponentConfirmed) {
            await mailer('yarmolich.e@mail.ru', 1, 2, call.date)
            return call.setStatus(2);
        }
        mailer('yarmolich.e@mail.ru', 1, 2, call.date)

        if (new Date(date) < new Date) {
            throw new Error('Не верно указана дата');
        }

        await call.update({
            opponentConfirmed, creatorConfirmed, date
        });

        if (call.opponentConfirmed && call.creatorConfirmed) {
            return call.setStatus(1);
        }

        return Promise.resolve();
    }
}

module.exports = CallService;

import api from '../utils/api';

class PlatoonService {
  static getPlatoons() {
    return api
      .get('/platoons')
      .then(response => response)
      .catch(error => error);
  }

  static createPlatoon(name) {
    return api
      .post('/platoons', { name })
      .then(response => response)
      .catch(error => error);
  }

  static deletePlatoon(id) {
    return api
      .delete(`/platoons/${id}`)
      .then(response => response)
      .catch(error => error);
  }

  static updatePlatoon(id, name) {
    return api
      .put(`/platoons/${id}`, { name })
      .then(response => response)
      .catch(error => error);
  }
}

export default PlatoonService;

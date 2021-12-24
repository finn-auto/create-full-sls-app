import { Country } from "../utils/constants";
import { getRequestId } from "../utils/tracing";

const CORRELATION_ID_KEY_NAME = "correlationId";
const REQUEST_COUNTRY_KEY_NAME = "requestCountry";

class ContextStore {
  private readonly _contextStore: Map<string, string>;

  constructor() {
    this._contextStore = new Map();
  }

  public get correlationId() {
    let correlationId = this._contextStore.get(CORRELATION_ID_KEY_NAME);
    if (!correlationId) {
      correlationId = getRequestId();
      this._contextStore.set(CORRELATION_ID_KEY_NAME, correlationId);
    }

    return correlationId;
  }

  public set correlationId(value: string) {
    this._contextStore.set(CORRELATION_ID_KEY_NAME, value);
  }

  public get requestCountry() {
    let requestCountry = this._contextStore.get(REQUEST_COUNTRY_KEY_NAME);
    if (!requestCountry) {
      requestCountry = Country.DE;
      this._contextStore.set(REQUEST_COUNTRY_KEY_NAME, requestCountry);
    }

    return requestCountry;
  }

  public set requestCountry(value: string) {
    this._contextStore.set(REQUEST_COUNTRY_KEY_NAME, value);
  }
}

const store = new ContextStore();

export default store;

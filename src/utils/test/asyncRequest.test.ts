import {
  AsyncRequestLoading,
  AsyncRequestNotStarted,
  ASYNC_REQUEST_FAILED_ACTION,
  generateAsyncRequestReducer,
  genericAsyncActions,
  ASYNC_REQUEST_LOADED_ACTION,
  ASYNC_REQUEST_LOADING_ACTION,
  AsyncRequestFailed,
  AsyncRequestCompleted,
  rehydrateAsyncRequest,
} from '../asyncRequest';

describe('asyncRequest ', () => {
  describe('genericAsyncActions', () => {
    it('creates generic action with a unique key', () => {
      const generator1 = genericAsyncActions<string, Error>();
      const generator2 = genericAsyncActions<string, Error>();
      const response = 'myResponse';

      expect(generator1.loaded(response)).toEqual({
        type: ASYNC_REQUEST_LOADED_ACTION,
        payload: { key: generator1.key, response },
      });
      expect(generator1.key).not.toEqual(generator2.key);
    });
    it('creates generic actions for loading, loaded, failed', () => {
      const generator1 = genericAsyncActions<string, Error>();
      const err = new Error();
      const response = 'myResponse';

      expect(generator1.loading()).toEqual({
        type: ASYNC_REQUEST_LOADING_ACTION,
        payload: { key: generator1.key },
      });
      expect(generator1.loaded(response)).toEqual({
        type: ASYNC_REQUEST_LOADED_ACTION,
        payload: { key: generator1.key, response },
      });
      expect(generator1.failed(err)).toEqual({
        type: ASYNC_REQUEST_FAILED_ACTION,
        payload: { key: generator1.key, error: err },
      });
    });
  });

  describe('generateAsyncRequestReducer', () => {
    const initialState = AsyncRequestNotStarted<Campaign, Error>();
    const actions = genericAsyncActions<Campaign, Error>();
    const campaignRequestReducer = generateAsyncRequestReducer<
      CampaignProductsReducerState,
      Campaign,
      Error
    >(actions.key);

    it('updates the state for a loading action with given key', () => {
      expect(campaignRequestReducer(initialState, actions.loading())).toEqual(
        AsyncRequestLoading<Campaign, Error>(),
      );
    });

    it('updates the state for a failed action with given key', () => {
      const e = new Error();
      expect(campaignRequestReducer(initialState, actions.failed(e))).toEqual(
        AsyncRequestFailed<Campaign, Error>(e),
      );
    });

    it('updates the state for a loaded action with given key', () => {
      const campaign: Campaign = {
        campaignName: 'name',
        campaignId: 1,
      };
      expect(
        campaignRequestReducer(initialState, actions.loaded(campaign)),
      ).toEqual(AsyncRequestCompleted<Campaign, Error>(campaign));
    });

    it('does not update on mismatched keys', () => {
      const misMatchedActions = genericAsyncActions<Campaign, Error>();

      expect(
        campaignRequestReducer(initialState, misMatchedActions.loading()),
      ).toEqual(AsyncRequestNotStarted<Campaign, Error>());
    });
  });

  describe('rehydrateAsyncRequest', () => {
    it('noops for a `NotStarted` request', () => {
      const notStartedRequest = AsyncRequestNotStarted();

      expect(rehydrateAsyncRequest(notStartedRequest)).toEqual(
        notStartedRequest,
      );
    });

    it('noops for a `Completed` request', () => {
      const completedRequest = AsyncRequestCompleted([]);

      expect(rehydrateAsyncRequest(completedRequest)).toEqual(completedRequest);
    });

    it('noops for a `Failed` request', () => {
      const failedRequest = AsyncRequestFailed(new Error());

      expect(rehydrateAsyncRequest(failedRequest)).toEqual(failedRequest);
    });

    it('resets a `Loading` request back to a `NotStarted` request', () => {
      const loadingRequest = AsyncRequestLoading();
      const notStartedRequest = AsyncRequestNotStarted();

      expect(rehydrateAsyncRequest(loadingRequest)).toEqual(notStartedRequest);
    });
  });
});

import { ProtectedApiClient } from "./protectedApiClient";
import { PublicApiClient } from "./publicApiClient";

export interface ApiExtraArgs {
    readonly publicApiClient: PublicApiClient;
    readonly protectedApiClient: ProtectedApiClient;
}
export class CreatePaymentDto {
  sourceType: 'BID' | 'PRODUCT';
  sourceId: number;
}

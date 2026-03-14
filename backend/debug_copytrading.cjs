const mongoose = require('mongoose');

// Define schemas inline for debug
const copyTradeSchema = new mongoose.Schema({
  masterTradeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trade' },
  masterId: { type: mongoose.Schema.Types.ObjectId, ref: 'MasterTrader' },
  followerTradeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trade' },
  followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'CopyFollower' },
  followerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  symbol: String,
  side: String,
  masterLotSize: Number,
  followerLotSize: Number,
  copyMode: String,
  copyValue: Number,
  status: String,
  failureReason: String,
  createdAt: Date
});

const tradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tradingAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'TradingAccount' },
  symbol: String,
  side: String,
  quantity: Number,
  openPrice: Number,
  status: String,
  createdAt: Date
});

// Create models
const CopyTrade = mongoose.model('CopyTrade', copyTradeSchema);
const Trade = mongoose.model('Trade', tradeSchema);

async function debug() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/unicap');
    console.log('=== Recent Copy Trades Debug ===');
    
    // Check recent copy trades
    const recentCopyTrades = await CopyTrade.find({})
      .sort({ createdAt: -1 })
      .limit(10);
    
    console.log('1. Recent Copy Trades:', recentCopyTrades.length);
    
    recentCopyTrades.forEach((copyTrade, index) => {
      console.log(`\n${index + 1}. Copy Trade:`);
      console.log(`   Symbol: ${copyTrade.symbol}`);
      console.log(`   Side: ${copyTrade.side}`);
      console.log(`   Master Lot: ${copyTrade.masterLotSize}`);
      console.log(`   Follower Lot: ${copyTrade.followerLotSize}`);
      console.log(`   Copy Mode: ${copyTrade.copyMode}`);
      console.log(`   Status: ${copyTrade.status}`);
      console.log(`   Created: ${copyTrade.createdAt}`);
      if (copyTrade.failureReason) {
        console.log(`   ❌ Failure: ${copyTrade.failureReason}`);
      }
    });
    
    // Check recent trades for both users
    console.log('\n2. Recent Trades for Master (hello@gmail.com):');
    const masterUser = await mongoose.connection.db.collection('users').findOne({ email: 'hello@gmail.com' });
    if (masterUser) {
      const masterTrades = await mongoose.connection.db.collection('trades')
        .find({ userId: masterUser._id, status: 'OPEN' })
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray();
      
      console.log(`   Open Trades: ${masterTrades.length}`);
      masterTrades.forEach((trade, index) => {
        console.log(`   ${index + 1}. ${trade.symbol} ${trade.side} ${trade.quantity} lots at ${trade.openPrice}`);
      });
    }
    
    console.log('\n3. Recent Trades for Follower (hello2@gmail.com):');
    const followerUser = await mongoose.connection.db.collection('users').findOne({ email: 'hello2@gmail.com' });
    if (followerUser) {
      const followerTrades = await mongoose.connection.db.collection('trades')
        .find({ userId: followerUser._id, status: 'OPEN' })
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray();
      
      console.log(`   Open Trades: ${followerTrades.length}`);
      followerTrades.forEach((trade, index) => {
        console.log(`   ${index + 1}. ${trade.symbol} ${trade.side} ${trade.quantity} lots at ${trade.openPrice}`);
      });
    }
    
  } catch (error) {
    console.error('Debug Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

debug();

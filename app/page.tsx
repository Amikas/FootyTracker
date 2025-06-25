'use client'

import { useEffect, useState, useRef } from 'react'
import DashboardHeader from "@/components/dashboard/dashboard-header"
import PerformanceOverview from "@/components/dashboard/performance-overview"
import TrainingMetrics from "@/components/dashboard/training-metrics"
import UpcomingGoals from "@/components/dashboard/upcoming-goals"
import { GoalsProvider } from '@/components/contexts/goals-context'
import OllamaChatbot from "@/components/ollama-chatbot"
import { BounceLoader } from 'react-spinners'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import WeatherWidget from "@/components/dashboard/weather-widget"

export default function Dashboard() {
  // Set up automatic sync every 10 minutes
  useEffect(() => {
    const syncData = async () => {
      try {
        await fetch('/api/fitbit/sync', {
          method: 'POST',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })
      } catch (error) {
        console.error('Auto-sync failed:', error)
      }
    }

    // Initial sync
    syncData()

    // Sync data when the tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncData()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Football quote state
  const [quote, setQuote] = useState<{text: string, author: string} | null>(null)
  const [loadingQuote, setLoadingQuote] = useState(false)
  const quoteTimer = useRef<NodeJS.Timeout | null>(null)
  const [quoteList, setQuoteList] = useState<{text: string, author: string}[]>([])
  const [quoteIdx, setQuoteIdx] = useState(0)

  // Fetch all football quotes from the Diamond Football page (pre-extracted)
  const fetchFootballQuotes = async () => {
    setLoadingQuote(true)
    try {
      // Pre-extracted quotes from the page (for demo, in real use, fetch from your own API or a gist)
      const quotes = [
        { text: "You have to fight to reach your dream. You have to sacrifice and work hard for it.", author: "Lionel Messi" },
        { text: "I learned all about life with a ball at my feet.", author: "Ronaldinho" },
        { text: "Football is a game of mistakes. Whoever makes the fewest mistakes wins.", author: "Johan Cruyff" },
        { text: "I am not a perfectionist, but I like to feel that things are done well. More important than that, I feel an endless need to learn, to improve, to evolve, not only to please the coach and the fans but also to feel satisfied with myself.", author: "Cristiano Ronaldo" },
        { text: "The more difficult the victory, the greater the happiness in winning.", author: "Pelé" },
        { text: "It's not just about the money, it's about what you achieve on the pitch.", author: "Ronaldinho" },
        { text: "The secret is to believe in your dreams; in your potential that you can be like your star, keep searching, keep believing, and don't lose faith in yourself.", author: "Neymar Jr." },
        { text: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice, and most of all, love of what you are doing or learning to do.", author: "Pelé" },
        { text: "Football, like life, is filled with ups and downs, and the most important thing is to keep moving forward and never give up.", author: "Diego Maradona" },
        { text: "There is no pressure when you're making a dream come true.", author: "Neymar Jr." },
        { text: "Football is a simple game; 22 men chase a ball for 90 minutes, and at the end, the Germans always win.", author: "Gary Lineker" },
        { text: "Some people believe football is a matter of life and death, I am very disappointed with that attitude. I can assure you it is much, much more important than that.", author: "Bill Shankly" },
        { text: "I spent my life trying not to be arrogant. But when you're the best, you start telling it.", author: "Zlatan Ibrahimovic" },
        { text: "The ball is round, the game lasts ninety minutes, and everything else is just theory.", author: "Sepp Herberger" },
        { text: "The first 90 minutes are the most important.", author: "Bobby Robson" },
        { text: "We don’t want our players to be monks. We want them to be better football players because a monk does not play football at this level.", author: "Bobby Robson" },
        { text: "That lad must have been born offside", author: "Alex Ferguson" },
        { text: "It’s getting tickly now – squeaky-bum time, I call it.", author: "Alex Ferguson" },
        { text: "I want to talk about facts.", author: "Rafa Benitez" },
        { text: "So, when you are in the Premier League, you are the tail of the lion, and some people are happy being the tail of the lion; some prefer to be the head of the mouse.", author: "Rafa Benitez" },
        { text: "We didn't underestimate them. They were just a lot better than we thought", author: "Bobby Robson" },
        { text: "First, I went left; he did too. Then I went right, and he did, too. Then I went left again, and he went to buy a hot dog.", author: "Zlatan Ibrahimovic" },
        { text: "Football is not just a game; it's an art form. You have to be creative, think outside the box, and always be one step ahead of your opponent.", author: "Ronaldinho" },
        { text: "The game of football is like a canvas, and it’s up to the players to paint the most beautiful picture.", author: "Diego Maradona" },
        { text: "Football is an art, like dancing is an art - but only when it's well done does it become an art.", author: "Arsene Wenger" },
        { text: "To me, football is the simplest and most complex game. Simple because it's played with a ball, and complex because there are so many ways to play it.", author: "Andres Iniesta" },
        { text: "Football is the ballet of the masses.", author: "Dmitri Shostakovich" },
        { text: "Football is more than just a game. It can bring hope and joy to people's lives.", author: "Didier Drogba" },
        { text: "Football is the only thing that can bring together an entire country, regardless of political or religious differences.", author: "Zinedine Zidane" },
        { text: "I think football is more than a game; it is a passion. It is something that comes from inside and touches people's hearts.", author: "Yaya Touré" },
        { text: "Football is a universal language. It brings people together, irrespective of their nationalities, cultures or beliefs.", author: "George Weah" },
        { text: "Football is the most important of the less important things in the world.", author: "Carlo Ancelotti" },
        { text: "You cannot win a game of football on your own; it's about the entire squad working together to achieve something. That's how football works: it has always been about the group, not the individual.", author: "Lucy Bronze" },
        { text: "I think we need to kind of stop talking about how big women’s football is getting and talk about how big it is.", author: "Georgia Stanway" },
        { text: "Every single day, I wake up and commit myself to becoming a better player.", author: "Mia Hamm" },
        { text: "No one is bigger than the team, you win together, and you can certainly lose together.", author: "Sam Kerr" },
        { text: "If they think your dreams are crazy, show them what crazy dreams can do.", author: "Julie Ertz" }
      ]
      setQuoteList(quotes)
      setQuoteIdx(Math.floor(Math.random() * quotes.length))
      setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    } catch (e) {
      setQuoteList([])
      setQuote({ text: "Football is more than a game. It's a way of life!", author: "Unknown" })
    }
    setLoadingQuote(false)
  }

  // Shuffle quote every 5 minutes
  useEffect(() => {
    fetchFootballQuotes()
    if (quoteTimer.current) clearInterval(quoteTimer.current)
    quoteTimer.current = setInterval(() => {
      if (quoteList.length > 0) {
        const next = Math.floor(Math.random() * quoteList.length)
        setQuoteIdx(next)
        setQuote(quoteList[next])
      }
    }, 5 * 60 * 1000)
    return () => {
      if (quoteTimer.current) clearInterval(quoteTimer.current)
    }
  }, [quoteList.length])

  const skipQuote = () => {
    if (quoteList.length > 0) {
      let next = Math.floor(Math.random() * quoteList.length)
      if (next === quoteIdx) next = (next + 1) % quoteList.length
      setQuoteIdx(next)
      setQuote(quoteList[next])
    }
  }

  return (
    <>
      <DashboardHeader />
      <main 
        id="main-content" 
        className="flex min-h-screen flex-col"
        tabIndex={-1}
      >
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6" tabIndex={-1}>
            Training Dashboard
          </h1>
          <GoalsProvider>
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
              role="region"
              aria-label="Performance Overview"
            >
              <PerformanceOverview />
              <TrainingMetrics />
              <UpcomingGoals />
              {/* Football Quote Card in its own column */}
              <div className="hidden md:block">
                <Card className="shadow-lg border-yellow-400 h-full flex flex-col justify-between">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-600 font-bold text-lg flex items-center gap-2">
                      <span role="img" aria-label="Football">⚽</span> Football Quote
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-col gap-2">
                    {loadingQuote ? (
                      <div className="italic text-white">Loading...</div>
                    ) : quote ? (
                      <>
                        <div className="italic text-white">
                          "{quote.text}"
                        </div>
                        <div className="text-right text-sm text-yellow-600 font-bold">- {quote.author}</div>
                      </>
                    ) : (
                      <div className="italic text-white">No quote available.</div>
                    )}
                    <Button size="sm" variant="outline" className="self-end mt-2 border-yellow-400 text-white-900" onClick={skipQuote}>
                      Next Quote
                    </Button>
                  </CardContent>
                </Card>
              </div>
              {/* Weather Widget in its own column */}
              <div className="hidden md:block">
                <WeatherWidget />
              </div>
            </div>
            {/* For mobile, show quote card below the grid */}
            <div className="block md:hidden mt-6">
              <Card className="shadow-lg border-yellow-400">
                <CardHeader className="pb-2">
                  <CardTitle className="text-yellow-900 text-lg flex items-center gap-2">
                    <span role="img" aria-label="Football">⚽</span> Football Quote
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col gap-2">
                  {loadingQuote ? (
                    <div className="italic text-white">Loading...</div>
                  ) : quote ? (
                    <>
                      <div className="italic text-white">
                        "{quote.text}"
                      </div>
                      <div className="text-right text-sm text-yellow-700 font-bold">- {quote.author}</div>
                    </>
                  ) : (
                    <div className="italic text-white">No quote available.</div>
                  )}
                  <Button size="sm" variant="outline" className="self-end mt-2 border-yellow-400 text-yellow-900" onClick={skipQuote}>
                    Next Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div 
              className="mt-6"
              role="region"
              aria-label="Recent Activities"
            >
              {/* <RecentActivities /> */}
            </div>
          </GoalsProvider>
        </div>
      </main>
      <OllamaChatbot />
    </>
  )
}
